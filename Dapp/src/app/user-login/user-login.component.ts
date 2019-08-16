import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { Web3Service } from "../util/web3.service";
import * as uuid from "uuid";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"]
})
export class UserLoginComponent implements OnInit {
  model = {
    uuid: "",
    password: ""
  };

  user = {
    uuid: 1231231231321,
    name: "Akash",
    constituency: "Banglore",
    dob: "December 17 1995",
    address: "h9/364, IIT Bombay, Powai",
    voterId: "",
    verification_status: true,
    is_eligible: true
  };

  elections = [
    {
      label: "Test Election",
      startTime: "April 21, 2019",
      endTime: "May 21, 2019",
      status: 0 // 0 - yet to start, 1- ongoing, 2 - completed
    },
    {
      label: "XYZ Election",
      startTime: "April 21, 2019",
      endTime: "June 21, 2019",
      status: 1 
    },
    {
      label: "ABC Election",
      startTime: "September 21, 2019",
      endTime: "October 21, 2019",
      status: 2
    }

  ];

  constructor(
    private matSnackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private web3Service: Web3Service
  ) {}

  ngOnInit() {}

  verify_user() {
    this.setStatusShort("Verifying User ...");
  }

  setStatus(status) {
    this.matSnackBar.open(status, null, { duration: 3000 });
  }

  setStatusShort(status) {
    this.matSnackBar.open(status, null, { duration: 2000 });
  }

  // functions for dashboard
  refreshVerificationStatus() {
    this.setStatus("Refreshing Verification Status ...");
  }

  getVoterId() {
    this.setStatusShort("Generating Voter ID ...");
    const voterId = uuid.v4().toString();
    // let voterId = 'asf';
    this.user.voterId = voterId;
  }

  vote() {
    this.setStatusShort("Redirecting to Voting Page ...");
    this.router.navigateByUrl('/login');
  }

  getResults() {
    this.setStatusShort("Redirecting to Results Page ...");
    this.router.navigateByUrl('/resultsverify');
  }
}
