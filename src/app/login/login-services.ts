import { WebAppConstants } from "../website.constants";
import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Utilities } from '../Utilities';
import { ThumbnailImage } from './data-model'
import { LoginComponent } from "./login.component";
import { Router } from "@angular/router"
import { ConstantPool } from "@angular/compiler";
import { AuthService } from "../auth-service";

@Injectable({
    providedIn: 'root'
  })
export class LoginService
{
    constructor(private httpClient: HttpClient, private authService: AuthService, private route: Router)
    {}
    private getLoginThumbnailObservable()
    {
        return this.httpClient.get<ThumbnailImage>(WebAppConstants.get_login_thumbnail, { params: {platform: Utilities.getPlatform()}})
    }

    public getLoginThumbnail(view: LoginComponent)
    {
        this.getLoginThumbnailObservable().subscribe(
            success=>
            {
                view.thumbnail = WebAppConstants.api_host  + success.image
                view.loading = false
            }
            ,
            error =>
            {
                view.loading = false
            }
        )
    }
    
    private logInObservable(username: string, password: string)
    {
        return this.httpClient.post(WebAppConstants.login, {username: username, password: password}) 
    }
    public logIn(username:string, password:string, view: LoginComponent)
    {
        this.authService.login(username,  password).subscribe(
            success =>
            {
                this.route.navigate(['dashboard'])
            }
            ,
            error => 
            {
                console.log(error)
                if(error.status == HttpStatusCode.Forbidden)
                {
                    alert(error.error['error'])
                }
                else if(error.status == HttpStatusCode.Unauthorized)
                {
                    view.userNameControl.setErrors({'incorrect': true})
                    view.passwordControl.setErrors({'incorrect': true})
                    view.failedLogin = true
                }
            }
        )
    }
}