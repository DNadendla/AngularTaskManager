import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:8081/api/auth';
  private tokenKey = 'jwtToken';
  currentUsername: string = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private jwtHelperService: JwtHelperService
  ) {
    this.currentUsername = localStorage.getItem('currentUsername') || '';
  }

  login(loginViewModel: User): Observable<any> {
    /* return this.httpClient
      .post('http://localhost:8081/api/login', loginViewModel)
      .pipe(
        map((user: any) => {
          this.currentUsername = user.uname;
          localStorage.setItem('currentUsername', user.uname);
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        })
      ); */
    return this.httpClient.post(`${this.baseUrl}/login`, loginViewModel).pipe(
      tap((user: any) => {
        this.currentUsername = user.uname;
        localStorage.setItem('currentUsername', user.uname);
        localStorage.setItem('token', user.token);
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getLoggedInUserRoles(): string[] {
    return this.jwtHelperService.decodeToken(
      this.getToken() ? this.getToken()! : ''
    ).roles;
  }

  logout(): void {
    this.currentUsername = '';
    //localStorage.setItem('currentUsername', '');
    localStorage.clear();
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    var token = this.getToken();
    if (this.jwtHelperService.isTokenExpired(token)) {
      console.log('Token expired');
      this.logout();
      return false;
    }
    return true;
  }
}
