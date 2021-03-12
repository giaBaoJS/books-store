import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user;
  token = false;
  constructor() {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('profile'));
    if (this.user?.token) {
      this.token = true;
    }
  }
  logOut() {
    localStorage.removeItem('profile');
  }
}
