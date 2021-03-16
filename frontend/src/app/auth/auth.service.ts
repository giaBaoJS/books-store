import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/books';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
}
