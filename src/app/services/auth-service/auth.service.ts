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
   *
   */
  public user: any = {};
  public admin: Admin = new Admin();

  /**
   * This function logs the user into the application
   * @param user
   */

  login(userName: string, password: string): Observable<User> {
    let user = {username: userName, password: password};
    return this.http.post<User>(this.url, user);

  }

  /**
   * This function sets the session.
   */

  setSession(authResult) {

    let token = jwt(authResult.token);

    const expiresAt = moment().add(token.exp);

    sessionStorage.setItem("id_token", authResult.token);
    sessionStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    sessionStorage.setItem("user_id", JSON.stringify(authResult.userId));
    sessionStorage.setItem("name", authResult.firstName);
    sessionStorage.setItem("hcity", authResult.hCity);
    sessionStorage.setItem("haddress", authResult.hAddress);
    sessionStorage.setItem("hstate", authResult.hState);
  }

  /**
   * This function will logout the user.
   */

  logout() {
    sessionStorage.removeItem("id_token");
    sessionStorage.removeItem("expires_at");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("hcity");
    sessionStorage.removeItem("haddress");
    sessionStorage.removeItem("hstate");
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
    const expiration = sessionStorage.getItem("expires_at");
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
