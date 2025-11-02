import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8081/user'; // change if backend URL differs

  constructor(private httpClint: HttpClient) {}

  getUser(email: String): Observable<User> {
    return this.httpClint.get<User>(`${this.baseUrl}/${email}`);
  }

  addUser(user: User): Observable<User> {
    return this.httpClint.post<User>(`${this.baseUrl}`, user);
  }
}
