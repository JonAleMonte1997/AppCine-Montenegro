import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
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
      return of(true);
    }

    return of(false);
  }
}
