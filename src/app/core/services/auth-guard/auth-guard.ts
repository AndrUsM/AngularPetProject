import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { isAuthorized } from '@core/utils/is-authorized';

@Injectable()
export class AuthGuard implements CanActivateChild {

  constructor(private router: Router) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!isAuthorized()) {
      return true;
    }

    this.router.navigate(['/app/homepage']);
    return false;
  }
}