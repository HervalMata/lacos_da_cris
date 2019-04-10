import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
      private authServicr: AuthService,
      private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuth = this.authServicr.isAuth();
    this.redirectIfAuthenticated(isAuth);
    return isAuth;
  }

  private redirectIfAuthenticated(isAuth: boolean) {
    if (!isAuth) {
        this.router.navigate(['login'])
    }
  }
}