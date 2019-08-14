import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Web3Service } from '../util/web3.service';
import Web3 from 'web3';
// const Election = artifacts.require("Election");
import election_artifact from '../../../build/contracts/Election.json';
// var network_config = {
//     // httpradar: new http("https://api.radarrelay.com/0x/v2"),
//     RPC_PROVIDER: "https://mainnet.infura.io/v3/425313c6627e43ddb43324a9419c9508",
//     NETWORK_ID: 1,
//     ASSET_URL: "https://api.radarrelay.com/v2/markets/",
//     ETHERSCAN_TX: "https://etherscan.io/tx/"
// }
var network_config = {
    // httpradar: new http("https://api.radarrelay.com/0x/v2"),
    RPC_PROVIDER: "http://localhost:8545/",
    NETWORK_ID: 1
}

// setting provider to infura
var web3 = new Web3(new Web3.providers.HttpProvider(network_config.RPC_PROVIDER));


export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Ramesh', weight: "BJP", symbol: 'H'},
  {position: 2, name: 'Suresh', weight: "Congress", symbol: 'He'},
  {position: 3, name: 'Gaurav', weight: "PJP", symbol: 'Li'},
  {position: 4, name: 'Mahesh', weight: "AJP", symbol: 'Be'},
  {position: 5, name: 'Gita', weight: "JNJ", symbol: 'B'},
  {position: 6, name: 'Chris', weight: "BHP", symbol: 'C'},
  {position: 7, name: 'Faizan', weight: "BSP", symbol: 'N'}
];

@Component({
    selector: 'app-vote',
    templateUrl: './vote.component.html',
    styleUrls: ['./vote.component.css']
})
export class VoteComponent {

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
            // this.web3Service.uuid = 999999999999;
        var ec_head = await this.ElectionInstance.methods.EC_Head.call();
        console.log("ec head : ", ec_head);
        // var url = "http://localhost:8000/v1/kyc/info/" + this.web3Service.uuid.toString() + "/";
        // this.http.get(url).subscribe((res) => {
        //     console.log(res);
        //     this.model.kyc_info = res;
        //     this.model.constituency = res["constituency"];

        //     if (this.model.constituency != null) {

        //         var url = "http://localhost:8000/v1/constituency/" + this.model.constituency + "/candidate_list/";
        //         this.http.get(url).subscribe((res) => {
        //             console.log(res);
        //             this.model.candidates = res;
        //             this.model.show_voting_info = true;
        //         }, (error) => {
        //             console.log(error);
        //         })
        //     }
        //     else {
        //         this.setStatus("Cant fetch voting information correctly. Check after some time")
        //     }
        //     // this.setStatus("Your data is suElectionInstanceitted for verification. Come back after some time to check the status")
        // }, (error) => {
        //     console.log(error);
        // })
    }

    watchAccount() {
        this.web3Service.accountsObservable.subscribe((accounts) => {
            this.model.accounts = accounts;
            this.model.primary_account = accounts[0];
            console.log(accounts[0])
            // this.refreshBalance();
        });
    }

    get_info() {

        var url = "/v1/kyc/info/" + this.model.uuid.toString() + "/";
        this.http.get(url).subscribe((res) => {
            console.log(res);
            this.model.kyc_info = res;
            this.model.constituency = res["constituency"];

            if (this.model.constituency != null) {

                var url = "/v1/constituency/" + this.model.constituency + "/candidate_list/";
                this.http.get(url).subscribe((res) => {
                    console.log(res);
                    this.model.candidates = res;
                    this.model.show_voting_info = true;

                }, (error) => {
                    console.log(error);
                })
            }
            else {
                this.setStatus("Cant fetch voting information correctly. Check after some time")
            }
            // this.setStatus("Your data is suElectionInstanceitted for verification. Come back after some time to check the status")
        }, (error) => {
            console.log(error);
        })
    }

    async vote() {
        var vote_hash = web3.utils.keccak256(this.web3Service.uuid.toString() + this.model.security_token);
        console.log(vote_hash);
        var uuid_hash = web3.utils.keccak256(this.web3Service.uuid.toString());
        console.log(uuid_hash);

        var tx_hash = await this.ElectionInstance.registerVote(uuid_hash, this.model.constituency, this.model.selected_party, vote_hash, { from: this.model.accounts[0] })
            .on('receipt', (receipt) => {
                console.log('block mined');
                console.log(receipt);
                this.model.show_voting_info = false;
                this.setStatus("Vote Confirmed! You can view the transaction on etherscan");
            });

        console.log(tx_hash);
    }

    // async kycVerify() {

    //     var uuid_hash = web3.utils.keccak256(this.model.uuid.toString());
    //     console.log(uuid_hash);

    //     var tx_hash = await this.ElectionInstance.kycVerify(uuid_hash, { from: this.model.accounts[0] })
    //         .on('receipt', (receipt) => {
    //             console.log('verification done');
    //             console.log(receipt);
    //         });

    //     console.log(tx_hash);
    // }

    setStatus(status) {
        this.matSnackBar.open(status, null, { duration: 3000 });
    }

    setUuid(e) {
        this.model.uuid = e.target.value;
    }
    setSelectedCandidate(e) {
        this.model.selected_party = e.value;
        console.log(this.model.selected_party)
    }

    setSecurityToken(e) {
        this.model.security_token = e.target.value;
        console.log(this.model.security_token)
    }




}

// /**
//  * @title Basic use of `<table mat-table>`
//  */
// @Component({
//   selector: 'table-basic-example',
//   styleUrls: ['table-basic-example.css'],
//   templateUrl: 'table-basic-example.html',
// })
// export class TableBasicExample {
//   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
//   dataSource = ELEMENT_DATA;
// }

