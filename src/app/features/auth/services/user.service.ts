import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../../models/user.model';
import { usersMock } from './mocks/user.mock';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  add(user: User): Observable<User> {

    //Simulo el alta del usuario que se daría en el BackEnd

    let users: User[] = usersMock;

    users.push(user)

    return of(user);
  }

  get(email: String): Observable<User | undefined> {

    //Simulacion de la busqueda del backend

    let users: User[] = usersMock;

    let user: User | undefined = users.find(user => user.email === email);

    return of(user);
  }
}
