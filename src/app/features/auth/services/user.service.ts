import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authApi: string = `${environment.apiMovieUrl}/auth`;

  constructor(private httpClient: HttpClient) { }

  add(user: User): Observable<User> {

    return this.httpClient.post<User>(`${this.authApi}/newUser`, user);
  }

  get(email: String): Observable<User | undefined> {

    return this.httpClient.get<User | undefined>(`${this.authApi}/findByEmail/${email}`);
  }
}
