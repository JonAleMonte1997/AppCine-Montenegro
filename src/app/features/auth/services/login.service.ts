import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../../models/user.model';
import { usersMock } from './mocks/user.mock';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  validateLogin(email: string, password: string): Observable<boolean> {

    //La idea sería que la siguiente validación la realice el BackEnd

    let users: User[] = usersMock;

    let user: User | undefined = users.find(user => user.email == email && user.password == password);

    if (user) {
      this.createToke(user);
      return of(true);
    }

    return of(false);
  }

  createToke(user: User): void {
    localStorage.setItem('token', JSON.stringify(user));
  }

  isLogin(): boolean {
    return (localStorage.getItem('token')) ? true : false;
  }

  getUserToken(): User | undefined {
    return (this.isLogin()) ? JSON.parse(localStorage.getItem('token')!) : undefined;
  }

  logOut(): void {
    localStorage.removeItem('token');
  }
}
