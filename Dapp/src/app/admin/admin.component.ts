import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Web3Service } from '../util/web3.service';
import Web3 from 'web3';

import election_artifact from '../../../build/contracts/Election.json';

var network_config = {
  // httpradar: new http("https://api.radarrelay.com/0x/v2"),
  RPC_PROVIDER: "http://localhost:8545/",
  NETWORK_ID: 1
}

var web3 = new Web3(new Web3.providers.HttpProvider(network_config.RPC_PROVIDER));


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  ElectionInstance: any;

    model = {
        uuid: null,
        kyc_info: {},
        constituency: '',
        candidates: null,
        show_voting_info: false,
        selected_party: '',
        security_token: '',
        accounts: null,
        primary_account: null
    }

  constructor(private matSnackBar: MatSnackBar, private http: HttpClient, private web3Service: Web3Service) { }

  async ngOnInit() {
    console.log('OnInit: ' + this.web3Service);
        console.log(this);
        this.watchAccount();
        this.model.accounts = await web3.eth.getAccounts();
        console.log(this.model.accounts);

        this.web3Service.artifactsToContract(election_artifact)
            .then((InternCoinAbstraction) => {
                this.ElectionInstance = InternCoinAbstraction;
                this.ElectionInstance.deployed().then(deployed => {
                    console.log(deployed);
                    this.ElectionInstance = deployed;
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

async calculate(){
  var tx_hash = await this.ElectionInstance.calculateVotes({ from: this.model.accounts[0] })
            .on('receipt', (receipt) => {
                console.log('Calculated');
                console.log(receipt);
            });

        console.log(tx_hash);
}

}
