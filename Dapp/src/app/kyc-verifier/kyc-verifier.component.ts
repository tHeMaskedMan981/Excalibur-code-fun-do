import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { Web3Service } from "../util/web3.service";
import Web3 from 'web3';
import voterdata_artifact from '../../../build/contracts/VoterData.json';
import moment from 'moment';

const network_config = {
  // httpradar: new http("https://api.radarrelay.com/0x/v2"),
  RPC_PROVIDER: "http://localhost:8545/",
  NETWORK_ID: 1
};

const web3 = new Web3(new Web3.providers.HttpProvider(network_config.RPC_PROVIDER));

@Component({
  selector: 'app-kyc-verifier',
  templateUrl: './kyc-verifier.component.html',
  styleUrls: ['./kyc-verifier.component.css']
})
export class KycVerifierComponent implements OnInit {
  VoterDataInstance: any;

  verifier = {
    name: "Tezan",

  };

  unverifiedVoters = [
    {
      uuid: 1231231231321,
      name: "Akash",
      constituency: "Banglore",
      dob: "December 17 1995",
      address: "h9/364, IIT Bombay, Powai",
      voterId: "",
      verification_status: "unverified",
      is_eligible: true
    },
    {
      uuid: 1229831671321,
      name: "Shubham",
      constituency: "Mumbai",
      dob: "July 2 1998",
      address: "H3/274, IIT Bombay, Powai",
      voterId: "",
      verification_status: "unverified",
      is_eligible: true
    }
  ];

  displayedColumns: string[] = ['Name', 'UUID', 'Date of Birth', 'Address', 'Constituency', 'Status'];

  model = {
    accounts: null,
    primary_account: null
  };

  constructor(
    private matSnackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private web3Service: Web3Service
  ) { }

  async ngOnInit() {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();
    this.model.accounts = await web3.eth.getAccounts();
    console.log(this.model.accounts);
    this.model.primary_account = this.model.accounts[0];

    this.web3Service.artifactsToContract(voterdata_artifact)
        .then((result: any) => {
            this.VoterDataInstance = result;
            this.VoterDataInstance.deployed().then(deployed => {
                console.log(deployed);
                this.VoterDataInstance = deployed;
            });

        });
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
        this.model.accounts = accounts;
        this.model.primary_account = accounts[0];
        console.log(accounts[0])
        // this.refreshBalance();
    });
  }

  setStatus(status) {
    this.matSnackBar.open(status, null, { duration: 3000 });
  }

  setStatusShort(status) {
    this.matSnackBar.open(status, null, { duration: 2000 });
  }

  public async verify(voter: any){
    this.setStatus("Verifying " + voter.name);
    voter.verification_status = "underProcess";

    // Handle dates
    let voter_dob = moment(new Date(voter.dob).toUTCString()).valueOf() / 1000;
    let current_time = moment(new Date().toUTCString()).valueOf() / 1000;
    let uuidHash = web3.utils.soliditySha3(voter.uuid);

    // Get the nonce & post data to the blockchain
    const nonce  = await this.web3Service.getNonce(this.model.primary_account);
    console.log("Got nonce: ", nonce);
    this.VoterDataInstance.kycVerify.sendTransaction(uuidHash, voter.name, voter_dob, current_time, {from: this.model.primary_account, nonce: nonce})
      .then((res, err) => {
        if(err !== undefined){
          console.error(err);
          voter.verification_status = "unverified";
        }
        else{
          console.log(res.receipt.status);
          if(res.receipt.status == true){
            voter.verification_status = "verified";
            this.removeVoterFromUnregistered(voter);
          }
          else{
            voter.verification_status = "unverified";
          }
          
        }
      }
    );
  }

  removeVoterFromUnregistered(voter: any){
    console.log("I am here")
    this.unverifiedVoters.splice(this.unverifiedVoters.findIndex((_voter) => _voter.uuid == voter.uuid), 1);
    console.log(this.unverifiedVoters);
  }

}
