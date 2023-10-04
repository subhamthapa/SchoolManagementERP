import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, shareReplay, catchError } from 'rxjs/operators';

import jwtDecode from 'jwt-decode';
import * as moment from 'moment';

import { WebAppConstants } from './website.constants';

function getAccessTokenExpiration() {
  const expiration = localStorage.getItem('expires_at');
  const expiresAt = JSON.parse(expiration || '{}');
  return moment(expiresAt);
}
function getRefreshTokenExpiration() {
  const expiration = localStorage.getItem('refresh_token_expires_at');
  const expiresAt = JSON.parse(expiration || '{}');
  return moment(expiresAt);
}
export function isLoggedIn() {
  return localStorage.getItem('accessToken') == null
    ? false
    : moment().isBefore(getRefreshTokenExpiration());
}
export function hasToken() {
  return localStorage.getItem('accessToken') == null ? false : true;
}
function hasAccessTokenExpired() {
  return moment().isAfter(getAccessTokenExpiration());
}
function hasRefreshTokenExpired() {
  return moment().isAfter(getRefreshTokenExpiration());
}
function getAccessToken() {
  return localStorage.getItem('accessToken');
}
function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}
const loginRouterRoute = '/login';

interface JWTPayload {
  user_id: number;
  username: string;
  email: string;
  exp: number;
}

@Injectable()
export class AuthService {
  private apiRoot = 'http://localhost:8000/auth/';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post(WebAppConstants.login, { username, password }).pipe(
      tap((response) => this.setSession(response)),
      shareReplay()
    );
  }
  baseWebsiteLogin(username: string, password: string) {
    return this.http.post(WebAppConstants.baseWebsiteLogin, { username, password }).pipe(
      tap((response) => this.setSession(response)),
      shareReplay()
    );
  }
  setSession(result: any) {
    const accessToken = result.access;
    var payload = jwtDecode<JWTPayload>(accessToken);
    const expiresAt = moment.unix(payload.exp);
    const refreshToken = result.refresh;
    payload = jwtDecode(refreshToken);
    const refreshTokeenExpiresAt = moment.unix(payload.exp);
    console.log(payload);
    localStorage.setItem('accessToken', result.access);
    localStorage.setItem('refreshToken', result.refresh);
    localStorage.setItem(
      'refresh_token_expires_at',
      JSON.stringify(refreshTokeenExpiresAt.valueOf())
    );
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
  getaccessToken(): string {
    return localStorage.getItem('accessToken') || '';
  }
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expires_at');
  }
  isLoggedIn() {
    if (
      localStorage.getItem('accessToken') == null &&
      localStorage.getItem('refreshToken') == null
    ) {
      return false;
    }
    return moment().isBefore(getRefreshTokenExpiration());
  }
  setRefreshedSession(response: any) {
    const accessToken = response.access;
    var payload = jwtDecode<JWTPayload>(accessToken);
    const expiresAt = moment.unix(payload.exp);
    localStorage.setItem('accessToken', response.access);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
  refreshAccessToken() {
    return this.http.post(WebAppConstants.refresh_token, {
      refresh: getRefreshToken(),
    });
  }
  redirectIfNotLoggedIn() {
    if (!isLoggedIn()) {
      this.router.navigate([loginRouterRoute]);
    }
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (isLoggedIn()) {
      if (!hasAccessTokenExpired()) {
        var token = localStorage.getItem('accessToken');
        if (token) {
          const cloned = req.clone({
            headers: req.headers.set('Authorization', 'Bearer '.concat(token)),
          });
          return next.handle(cloned);
        }
      } else if (hasRefreshTokenExpired()) {
        this.router.navigate([loginRouterRoute]);
      } else {
        return next.handle(req).pipe(
          catchError((error) => {
            return this.authService
              .refreshAccessToken()
              .pipe(
                tap((response: any) =>
                  this.authService.setRefreshedSession(response)
                )
              );
          })
        );
      }
    }
    return next.handle(req);
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.authService.isLoggedIn()
      ? true
      : this.router.navigate([loginRouterRoute]);
  }
}
