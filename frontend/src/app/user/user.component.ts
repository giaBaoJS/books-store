import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  id: string;
  user;
  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authService.getUser(this.id).subscribe((value) => {
      this.user = value;
    });
  }
}
