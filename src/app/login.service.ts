import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginViewModel } from './login-view-model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUsername: string = '';

  constructor(private httpClient: HttpClient) {
    this.currentUsername = localStorage.getItem('currentUsername') || '';
  }

  login(loginViewModel: LoginViewModel): Observable<any> {
    return this.httpClient
      .post('http://localhost:8081/api/login', loginViewModel)
      .pipe(
        map((response: any) => {
          this.currentUsername = response.uname;
          localStorage.setItem('currentUsername', response.uname);
          return response;
        })
      );
  }

  logout(): void {
    this.currentUsername = '';
  }
}
