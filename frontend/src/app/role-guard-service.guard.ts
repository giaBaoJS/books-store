import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate():boolean{
    if(this.authService.isAdmin()){
      return true;
    }
    else {
      this.router.navigate(['/books']);
      return false;
    }
  }
}
