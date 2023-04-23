    import { Injectable } from '@angular/core';
    import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
    import { CanActivate, Router } from '@angular/router';

    import { Observable } from 'rxjs';
    import { tap, shareReplay } from 'rxjs/operators';

    import jwtDecode from 'jwt-decode';
    import * as moment from 'moment';

    import { WebAppConstants } from './website.constants';

    import { environment } from '../environments/environment';

    @Injectable()
    export class AuthService {

    private apiRoot = 'http://localhost:8000/auth/';

    constructor(private http: HttpClient, private router: Router) { }

    private setSession(authResult: any) {
        const token = authResult.access;
        const payload = jwtDecode<JWTPayload> (token);
        const expiresAt = moment.unix(payload.exp);
        const refreshToken = authResult.refresh

        localStorage.setItem('token', authResult.access);
        localStorage.setItem('refreshToken', authResult.refresh);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    get token(): string {
        return localStorage.getItem('token')||'' ;
    }

    login(username: string, password: string) {
        console.log(username, password)
        return this.http.post(WebAppConstants.login,
        { username, password }
        ).pipe(
        tap(response => this.setSession(response)),
        shareReplay(),
        );
    }

    signup(username: string, email: string, password1: string, password2: string) {
        // TODO: implement signup
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
    }

    refreshToken() {
        console.log("Hello")
        if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
        return this.http.post(
            WebAppConstants.refresh_token,
            { refresh: this.refreshToken }
        ).pipe(
            tap(response => this.setSession(response)),
            shareReplay(),
        ).subscribe();
        }
        return null
    }
    hasExpired()
    {
        if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
            return true
        }
        else
        {
            return false
        }
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration||"{}");

        return moment(expiresAt);
    }

    isLoggedIn() {
        return moment().isBefore(this.getExpiration());
        
    }
    checkAuthority(redirectUrl: string)
    {
        if(this.isLoggedIn())
        {
            return true
        }
        else{
            this.router.navigate(['login', {'redirect': encodeURI(redirectUrl)}])
            return false
        }
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }
    }

    @Injectable()
    export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if(!this.hasExpired())
        //     var token = localStorage.getItem('token');
        // else
        var token = localStorage.getItem('token')
        if (token) {
        const cloned = req.clone({
            headers: req.headers.set('Authorization', 'Bearer '.concat(token))
        });

        return next.handle(cloned);
        } else {
        return next.handle(req);
        }
    }
    hasExpired()
    {
        if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
            return false
        }
        else
        {
            return true
        }
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration||"{}");

        return moment(expiresAt);
    }
    }

    @Injectable()
    export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate() {
        if (this.authService.isLoggedIn()) {
        this.authService.refreshToken();

        return true;
        } else {
        this.authService.logout();
        this.router.navigate(['login']);

        return false;
        }
    }
    }

    interface JWTPayload {
    user_id: number;
    username: string;
    email: string;
    exp: number;
    }