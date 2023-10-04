import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-website-login',
  templateUrl: './base-website-login.component.html',
  styleUrls: ['./base-website-login.component.css'],
})
export class BaseWebsiteLoginComponent {
  userNameControl = new FormControl('');
  passwordControl = new FormControl('');
  loginForm = new FormGroup({
    username: this.userNameControl,
    password: this.passwordControl,
  });
  loading: boolean = false;
  username: string = '';
  password: string = '';
  failedLogin: boolean = false;
  constructor(private authService: AuthService, private router:Router) {}
  logIn() {
    if (this.loading) {
      return;
    }
    for (let x in this.loginForm.controls) {
      var control = (this.loginForm.controls as any)[x];
      if (control.errors) {
        return false;
      }
    }
    this.authService
      .baseWebsiteLogin(
        this.loginForm.get('username')?.value || '',
        this.loginForm.get('password')?.value || ''
      )
      .subscribe(
        success=>
        {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        }
        ,
        error=>
        {
          this.failedLogin = true
        }
      );
    return false;
  }
}
