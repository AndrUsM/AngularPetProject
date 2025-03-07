import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';
import { isAuthorized } from '@core/utils/is-authorized';

@Injectable()
export class AuthGuard implements CanActivateChild {

  constructor(private router: Router) { }

  canActivateChild() {
    if (!isAuthorized()) {
      return true;
    }

    this.router.navigate(['/app/homepage']);
    return false;
  }
}