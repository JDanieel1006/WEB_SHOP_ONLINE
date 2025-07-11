import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router, UrlTree } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class authAdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token_admin');
    if (token) {
      return true;
    }
    return this.router.createUrlTree(['/admin']);
  }
}
