import { Component } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currentUsername: string = '';

  constructor(private loginService: LoginService) {
    this.currentUsername = loginService.currentUsername;
  }
  logout(): void {
    // this.currentUsername = null;
  }
}
