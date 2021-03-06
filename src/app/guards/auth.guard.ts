import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../features/auth/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    const isTokenExpired: boolean = this.loginService.isTokenExpired();

    const isLoggedIn: boolean = this.loginService.isLogin();


    if (!isLoggedIn) {
      this.router.navigate(['user/login']);
    }

    if (isTokenExpired) {

      this.loginService.deleteToken();

      window.location.reload();
    }

    return isLoggedIn;
  }

}
