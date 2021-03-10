import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

import { AuthorService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  errors = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthorService,
    private toast: HotToastService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required],
    });
  }

  onSubmit(loginData: { email: string; password: string }) {
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService
        .login(loginData)
        .pipe(
          this.toast.observe({
            loading: 'Pending...',
            success: 'Login Success',
            error: this.errors,
          })
        )
        .subscribe(
          (data) => {
            localStorage.setItem('profile', JSON.stringify({ ...data }));
            this.router.navigateByUrl('/books');
          },
          (err) => (this.errors = err.error.message)
        );
    }
  }
}
