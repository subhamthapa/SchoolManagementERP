import { Component, OnInit } from '@angular/core';
import { LoginService } from './login-services';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { isLoggedIn } from '../auth-service';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userNameControl = new FormControl('')
  passwordControl = new FormControl('');
  loading:boolean =  false
  thumbnail: string =""
  username: string = ""
  password: string = ""
  failedLogin: boolean = false
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    if(!isLoggedIn())
    {

    }
    this.loading = true
    this.loginService.getLoginThumbnail(this)
  }

  logIn()
  {
    console.log(this.userNameControl.errors)
    console.log(this.passwordControl.errors)
    this.failedLogin = false
    if(this.userNameControl.valid && this.passwordControl.valid)
    {
      this.loginService.logIn(this.username, this.password, this)
    }
    else if (this.userNameControl.errors?.['incorrect'] && this.passwordControl.valid)
    {
      this.loginService.logIn(this.username, this.password, this)
    }
    else if (this.userNameControl.valid && this.passwordControl.errors?.['incorrect'])
    {
      this.loginService.logIn(this.username, this.password, this)
    }

  }

}
