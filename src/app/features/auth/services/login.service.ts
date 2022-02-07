import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authApi: string = `${environment.apiMovieUrl}/auth`;

  constructor(private httpClient: HttpClient) { }

  validateLogin(email: string, password: string): Observable<boolean> {

    let user = {
      email: email,
      password: password
    };

    return this.httpClient.post(`${this.authApi}/login`, user).pipe(

      map((response:any) => {
        if (response.token) {

          let token = response.token;

          this.createToke(token);

          return true;
        } else {
          return false;
        }
      })
    )
  }

  createToke(token: string): void {
    localStorage.setItem('jona-token', token);
  }

  isLogin(): boolean {
    return (localStorage.getItem('jona-token')) ? true : false;
  }

  getToken(): string | null {
    return localStorage.getItem('jona-token');
  }

  getUserToken(): UserInfo | undefined {

    if (this.isLogin()) {


      let token = localStorage.getItem('jona-token')!;
      const decodedToken: any = jwt_decode(token);

      let userInfo: UserInfo = {
        email: decodedToken.sub,
        rol: decodedToken.ROLES,
        username: decodedToken.username
      }

      return userInfo;
    }

    return undefined;
  }

  logOut(): void {
    localStorage.removeItem('jona-token');
  }

  isAdmin(): boolean {

    let userInfo = this.getUserToken();

    if (userInfo) {
      if (userInfo.rol.indexOf('ROLE_ADMIN') > -1) {
        return true;
      }
    }

    return false;
  }

  isTokenExpired(): boolean {

    const token = this.getToken();

    if (token) {

      const decodedToken: any = jwt_decode(token);

      const isExpired: boolean = (Math.floor((new Date).getTime() / 1000) >= decodedToken.exp);

      return isExpired;
    }

    return false;
  }

  deleteToken(): void {
    localStorage.removeItem('jona-token');
  }
}
