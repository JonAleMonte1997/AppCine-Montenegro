import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { User, UserInfo } from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authApi: string = environment.authUrl;

  constructor(private httpClient: HttpClient) { }

  validateLogin(email: string, password: string): Observable<boolean> {

    let user = {
      email: email,
      password: password
    };

    return this.httpClient.post(`${this.authApi}/auth`, user).pipe(

      map((response:any) => {
        if (response.status === 'OK') {
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
    localStorage.setItem('token', token);
  }

  isLogin(): boolean {
    return (localStorage.getItem('token')) ? true : false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserToken(): UserInfo | undefined {

    if (this.isLogin()) {
      let token = localStorage.getItem('token')!;
      const decodedToken: any = jwt_decode(token);

      let userInfo: UserInfo = {
        email: decodedToken.email,
        rol: decodedToken.rol,
        username: decodedToken.username
      }

      return userInfo;
    }

    return undefined;
  }

  logOut(): void {
    localStorage.removeItem('token');
  }
}
