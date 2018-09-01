import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

import { UserLoggedInService } from '../user-logged-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password: '';

  btnDisabled = false;

  constructor(
    private router: Router,
    private data: DataService,
    private rest: RestApiService,
    private userLoggedIn: UserLoggedInService
  ) { }

  ngOnInit() {
  }

  validate() {
    if (this.email) {
        if (this.password) {
          return true;
        } else {
          this.data.error('Password is not entered');
        }
    } else {
      this.data.error('Email is not entered.');
    }
  }

  async login() {
    this.btnDisabled = true;
    try {
        if (this.validate()) {
            const data = await this.rest.post(
                'http://localhost:3030/api/accounts/login', 
                {
                  email: this.email,
                  password: this.password
                }
            );
            if (data['success']) {
                localStorage.setItem('token', data['token']);
                
                this.userLoggedIn.notifyUserLoggedIn();
                this.router.navigate(['/']);
            } else {
                this.data.error(data['message']);
            }
        } 

    } catch(error) {
        this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

}