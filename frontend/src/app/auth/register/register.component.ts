import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  errors = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toast: HotToastService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    });
  }
  onSubmit(registerData: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
  }) {
    if (this.registerForm.invalid) {
      return;
    } else {
      this.authService
        .register(registerData)
        .pipe(
          this.toast.observe({
            loading: 'Pending...',
            success: 'Register Success',
            error: this.errors,
          })
        )
        .subscribe(
          () => {
            this.router.navigateByUrl('/login');
          },
          (err) => (this.errors = err.error.message)
        );
    }
  }
}
