import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/books';

@Injectable()
export class AuthService {
  user;
  constructor(private http: HttpClient) {}

  login(userData: { email: string; password: string }) {
    return this.http.post('http://localhost:5000/users/login', userData);
  }

  register(userData: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
  }) {
    return this.http.post('http://localhost:5000/users/register', userData);
  }
  getUser(userId: string) {
    return this.http.get('http://localhost:5000/users/' + userId);
  }
  loggedIn(): boolean {
    return !!localStorage.getItem('profile');
  }
  isAdmin(): boolean {
    this.user = JSON.parse(localStorage.getItem('profile'));
    if (this.user) {
      if ((this.user.result.role === 'admin')) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
