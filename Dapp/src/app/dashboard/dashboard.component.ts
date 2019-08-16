import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Web3Service } from '../util/web3.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    model = {
        kyc_object: "asfasfasf",
        submitted: false,
        kyc_done: false,
        show_status: false,
        uuid_to_verify: null,
        uuid: null
    };

    user = {
        uuid:1231231231321,
        name:"Akash",
        constituency:"Banglore",
        dob:"December 17 1995",
        address:"h9/364, IIT Bombay, Powai",
        voterId:'',
        verification_status:'false'

    };

    constructor(private matSnackBar: MatSnackBar, private http: HttpClient,
                private router: Router, private web3Service: Web3Service) { }

    ngOnInit() {
    }
      
    setStatus(status) {
        this.matSnackBar.open(status, null, { duration: 3000 });
        if(status == "OTP Verified") {
            this.router.navigateByUrl('/vote');
        }
    }
    setStatusShort(status) {
        this.matSnackBar.open(status, null, { duration: 2000 });
        if(status == "OTP Verified") {
            this.router.navigateByUrl('/vote');
        }
    }

}
