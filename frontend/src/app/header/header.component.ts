import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

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
    window.location.reload();
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
}
