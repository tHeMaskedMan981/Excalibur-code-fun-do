import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../util/web3.service';
import web3 from 'web3';
import elec_artifacts from '../../../build/contracts/Election.json';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Bangalore', weight: "BJP", symbol: 100009},
  {position: 2, name: 'Gandhinagar', weight: "Congress", symbol: 130009},
  {position: 3, name: 'Goa', weight: "PJP", symbol: 100009},
  {position: 4, name: 'Mysore', weight: "AJP", symbol: 100009},
  {position: 5, name: 'Varanasi', weight: "JNJ", symbol: 100009},
  {position: 6, name: 'Chattisgarh', weight: "BHP", symbol: 100009},
  {position: 7, name: 'Faridabad', weight: "BSP", symbol: 100009}
];

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent  {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  hashes: string[];
  userHash: string;
  elec: any;

  constructor(private web3Service: Web3Service) { 

  }

  ngOnInit() {
    this.web3Service.artifactsToContract(elec_artifacts)
      .then((InternCoinAbstraction) => {
        this.elec = InternCoinAbstraction;
        this.elec.deployed().then(deployed => {
          console.log(deployed);
        });

      });
      // this.elec.
  }

  check(adhaar: number, password: string){
    //password = password.trim();
  //  this.hashes 
   this.userHash = web3.utils.keccak256(adhaar.toString()+password);
   console.log(this.userHash);
  }

}
