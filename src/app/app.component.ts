import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from './data.service';

import { UserLoggedInService } from './user-logged-in.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  searchTerm = '';
  isCollapsed = true;

  token;

  constructor (
      private router: Router, 
      private data: DataService, 
      private userLoggedIn: UserLoggedInService,
  ) {
      this.data.getProfile();
  }

  ngOnInit() { 
      this.token = localStorage.getItem("token");     
      this.userLoggedIn.userLoggedIn.subscribe(() => this.token = this.getToken());
  }
  
  getToken() {
    return localStorage.getItem('token');
  }

  collapse() {
    this.isCollapsed = true;
  }

  closeDropdown(dropdown) {
    dropdown.close();
  }

  logout() {
    this.data.user = {};
    localStorage.clear();
    this.token = '';
    this.router.navigate(['']);
  }

  search() {}
}
