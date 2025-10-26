import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuardService implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private jwtHelperService: JwtHelperService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    console.log('Allowed Roles: ' + route.data['expectedRoles']);
    console.log(
      'Decoded Token: ',
      this.jwtHelperService.decodeToken(
        this.loginService.getToken() ? this.loginService.getToken()! : ''
      )
    );

    const expectedRoles = route.data['expectedRoles'];

    if (!this.loginService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    // check if user has at least one of the required roles
    const userRoles = this.loginService.getLoggedInUserRoles();
    const hasRole = expectedRoles.some((role: string) =>
      userRoles.includes(role)
    );

    if (!hasRole) {
      //this.router.navigate(['/unauthorized']);
      return false;
    } else {
      return true;
    }
  }
}
