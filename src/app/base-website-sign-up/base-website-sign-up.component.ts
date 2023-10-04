import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseWebsiteService } from '../base-website/base-website.service';
import { error } from 'jquery';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';

const phone_no_regex = '^[0-9]{10}$';

@Component({
  selector: 'app-base-website-sign-up',
  templateUrl: './base-website-sign-up.component.html',
  styleUrls: ['./base-website-sign-up.component.css'],
})
export class BaseWebsiteSignUpComponent {
  loading = false;
  firstNameControl = new FormControl('', [Validators.required]);
  middleNameControl = new FormControl('');
  lastNameControl = new FormControl('', [Validators.required]);
  phoneNoControl = new FormControl('', [
    Validators.required,
    Validators.pattern(phone_no_regex),
  ]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  usernameControl = new FormControl('', [Validators.required]);
  occupationControl = new FormControl('', [Validators.required]);
  addressControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  password2Control = new FormControl('', [Validators.required]);
  userCreateForm = new FormGroup({
    first_name: this.firstNameControl,
    middle_name: this.middleNameControl,
    last_name: this.lastNameControl,
    phone_no: this.phoneNoControl,
    email: this.emailControl,
    username: this.usernameControl,
    occupation: this.occupationControl,
    address: this.addressControl,
    password: this.passwordControl,
    password2: this.password2Control,
  });
  constructor(
    private baseWebsiteService: BaseWebsiteService,
    private authService: AuthService,
    private route: Router
  ) {}

  signUp() {
    if (this.loading)
    {
      return
    }
    for (let x in this.userCreateForm.controls) {
      var control = (this.userCreateForm.controls as any)[x];
      if (control.errors) {
        return false;
      }
    }
    if (
      this.userCreateForm.value.password != this.userCreateForm.value.password2
    ) {
      this.userCreateForm.controls.password2.setErrors({ nomatch: true });
      return;
    }
    this.loading = true;
    this.baseWebsiteService
      .createBaseWebsiteUserObservable(this.userCreateForm.value)
      .subscribe(
        (success: any) => {
          this.authService.login(
            this.userCreateForm.get('username')?.value || '',
            this.userCreateForm.get('password')?.value || ''
          ).subscribe(
            success=>
            {
              this.loading = false
              this.route.navigate(['/dashboard']);
            }
            ,
            error=>
            {
              this.loading = false
              this.route.navigate(['/login']);
            }
          );
        },
        (error) => {
          this.loading = false;
          if (error.status == 403) {
            var component = error.error['component'];
            if (!component) return;
            switch (component) {
              case 'username':
                this.userCreateForm.controls.username.setErrors({
                  usernameNotAvailable: true,
                });
                break;
              case 'email':
                this.userCreateForm.controls.email.setErrors({
                  emailNotAvailable: true,
                });
                break;
              case 'phone_no':
                this.userCreateForm.controls.phone_no.setErrors({
                  phoneNoNotAvailable: true,
                });
                break;
            }
          }
        }
      );
    return false;
  }
}
