import { Injectable, Output, EventEmitter } from "@angular/core";
import { User } from "src/app/models/user";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Admin } from "src/app/models/admin";
import * as moment from "moment";
import * as jwt from "jwt-decode";
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  /**
   * This is the Authorization Service
   */

  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  //TODO: It was being used for the tests, not sure if we still need it
  loggedIn: boolean = false;

    /**
   * The url that we will be sending our posts to.
   */

  url = environment.authUri;

  /**
   * This is the constructor
   * @param router Creates a router instance
   * @param http Creates a httpClient instance
   */
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * An user object is created
   * TODO: Not sure why we need this
   */
  public user: any = {};
  public admin: Admin = new Admin();

  /**
   * This function logs the user into the application
   * @param user
   */

  login(userName: string, password: string): Observable <User> {
    let user = {username: userName, password: password};
    this.http.post<User>(this.url, user).subscribe((res) => {

      if (res) {
        this.setSession(res);

        if (res.driver) {
          this.router.navigate(["/home/riders"]);
          return res;
        } else {
          this.router.navigate(["/home/drivers"]);
          return res;
        }
      } else {
        return null;
      }
      // TODO: Figure out ngrx
      // this.fireIsLoggedIn.emit(res);

    });

    return null;
  }

  /**
   * This function sets the session.
   */

  private setSession(authResult) {

    let token = jwt(authResult.token);

    const expiresAt = moment().add(token.exp);
    console.log(expiresAt, " This is the expitration");

    localStorage.setItem("id_token", authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  /**
   * This function will logout the user.
   */

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  /**
   * This function will check if the user is logged in.
   */

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  /**
   * This function will check if the user is logged out.
   */

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  /**
   * This function will get the token expiration time.
   */

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  /**
   * This function returns an emitter.
   */

  loginAsAdmin(admin: Admin): boolean {

    this.http.post<Admin>(this.url, admin).subscribe((res) => {
      this.setSession;
    if (res) {
      this.router.navigate(["/admin"]);
      this.fireIsLoggedIn.emit(this.admin);
      return true;
    } else {
      return false;
    }

  });

  return false;
  }

  getEmitter() {
    return this.fireIsLoggedIn;
  }
  /**
   * This function will logout the user.
   */


}
