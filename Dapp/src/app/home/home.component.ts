import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  links = [
    {
      label: 'Register Voter',
      url: "/kyc"
    },
    {
      label: 'Login Voter',
      url: "/user-login"
    },
    {
      label: 'Admin Login',
      url: "/admin",
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
