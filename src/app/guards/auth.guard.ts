import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth-service/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})

/**
 * Guard to protect authenticated pages
 */

export class AuthGuard implements CanActivate {
  redirectUrl;

  /**
   * Will inject AuthService and the Router
   * @param authService
   * @param router
   */
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }

  /**
   * Checks to see if the user is currently logged in.
   * @param url
   */

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.redirectUrl = url;

    // Navigate to the home page with extras
    this.router.navigate([""]);
    return false;
  }
}
