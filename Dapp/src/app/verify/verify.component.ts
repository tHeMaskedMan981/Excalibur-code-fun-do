import { Component, OnInit } from "@angular/core";
import { Web3Service } from "../util/web3.service";
import web3 from "web3";
import elec_artifacts from "../../../build/contracts/Election.json";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

const PARTIES = ["BJP","Congress", "BSP"];

const RESULT_DATA = [
  {
    No: 1,
    "Constituency Name": "Bangalore",
    "Winning Party": "BJP",
    "Number of Votes": {
      BJP: 2,
      Congress: 1,
      BSP:0
    },
    voteHashes: {
      BJP: [
        "0xc3eb586d884134a11785f3cae787c62c2202449eac3faf7ad1f7cf019f633d88",
        "0x032900a7e5a67df376e806808ea9a92da5d78105982ab1e61222977c89a9f78e"
      ],
      Congress: [
        "0xc528c2cdb538fe56e760958e8becfea9b49f524d527252b422cded94d749c88b"
      ],
      BSP: [
      ]
    }
  }
];

@Component({
  selector: "app-verify",
  templateUrl: "./verify.component.html",
  styleUrls: ["./verify.component.css"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class VerifyComponent {
  columnsToDisplay: string[] = [
    "No",
    "Constituency Name",
    "Winning Party"
  ];
  dataSource = RESULT_DATA;
  hashes: string[];
  elec: any;
  parties = PARTIES;

  model = {
    uuid: "",
    voterCount: 34,
    voteHash: ""
  };
  constructor(private web3Service: Web3Service) {}

  ngOnInit() {
    this.web3Service
      .artifactsToContract(elec_artifacts)
      .then(InternCoinAbstraction => {
        this.elec = InternCoinAbstraction;
        this.elec.deployed().then(deployed => {
          console.log(deployed);
        });
      });
    // this.elec.
  }

  getVoteHash(adhaar: number, password: string) {
    //password = password.trim();
    //  this.hashes
    this.model.voteHash = web3.utils.keccak256(adhaar.toString() + password);
    console.log(this.model.voteHash);
  }

  getResult() {
    // this.model.voteHash = web3.utils.keccak256(adhaar.toString() + password);
    console.log(this.model.voteHash);
  }
}
