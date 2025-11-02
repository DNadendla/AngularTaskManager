import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginViewModel: User = new User();
  loginError: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  onLoginClick() {
    this.loginService.login(this.loginViewModel).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loginError = err.error.errorMessage;
        console.error('Login failed:', err);
      },
    });
  }
}
