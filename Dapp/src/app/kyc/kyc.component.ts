import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-kyc',
    templateUrl: './kyc.component.html',
    styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit {

    model = {
        kyc_object: null,
        submitted: false,
        kyc_done: false,
        show_status: false,
        uuid_to_verify: null
    }

    constructor(private matSnackBar: MatSnackBar, private http: HttpClient) { }

    ngOnInit() {
    }


    add(name: string, uuid: number, mobile: number, age: number, email: string, address: string, password: string): void {

        console.log(name + " : " + uuid + " : " + mobile + " : " + age + " : " + email + " : " + address);
        var data = {
            name,
            uuid,
            mobile,
            age,
            email,
            address,
            password
        }
        var url = "/v1/kyc/info/add/";
        this.http.post(url, data).subscribe((res) => {
            console.log(res);
            this.model.kyc_object = res;
            this.model.submitted = true;
            this.setStatus("Your data is submitted for verification. Come back after some time to check the status")
        })
    }

    verify(uuid: number) {

        var url = "/v1/kyc/info/" + uuid.toString() + "/";
        this.http.get(url).subscribe((res) => {
            console.log(res);
            this.model.kyc_done = res["kyc_done"];
            this.model.show_status = true;
            if (this.model.kyc_done) {
                this.setStatus("Kyc Verified!")
            }
            else {
                this.setStatus("Verification Peding. Check after some time")
            }
            // this.setStatus("Your data is submitted for verification. Come back after some time to check the status")
        }, (error) => {
            console.log(error);
            this.model.show_status = true;


        })


    }
    setStatus(status) {
        this.matSnackBar.open(status, null, { duration: 3000 });
    }

    set_uuid(e) {
        this.model.uuid_to_verify = e.target.value;
        this.model.show_status = false;
    }

}
