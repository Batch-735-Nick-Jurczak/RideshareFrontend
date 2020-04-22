import { Component, OnInit, NgModule, TemplateRef } from "@angular/core";
import { AuthService } from "src/app/services/auth-service/auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "src/app/models/user";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "src/app/services/user-service/user.service";
import { HttpClient } from "@angular/common/http";
import { relativeTimeThreshold } from 'moment';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})

/**
 * This is the login component
 */
export class LoginComponent implements OnInit {
  /**
   * Sets name string variable to the chosen user
   * Sets pagination
   */

  userName: string = "";
  passWord: string = "";
  totalPage: number = 1;
  curPage: number = 1;
  allUsers: User[];
  users;
  showDropDown: boolean;
  chosenUserFullName: string;
  chosenUser: User;

  failed: boolean = false;
  banned: boolean = false;

  pwdError: string;
  usernameError: string;
  userNotFound: string;
  modalRef: NgbModalRef;

  /**
   * This is a constructor
   * @param http A HTTP Client is created.
   * @param authService An auth service is injected.
   *
   */
  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private userService: UserService,
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * When the component is initialized, the system checks
   * for the session storage to validate. Once validated,
   * the user service is called to retrieve all users.
   */
  ngOnInit() {

  }

  /**
   * A function that indicate a fail to login
   */
  loginFailed() {
    this.userName = "";
    this.failed = true;
  }

  /**
   * A function that sets user as banned
   */
  loginBanned() {
    this.userName = "";
    this.banned = true;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.open(template);
  }

    /**
   * Function which sets a timeout for a desired duration.
   * @param ms the number of milliseconds
   */
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * A login function that checks if the user information
   * is correct in the database, if true then it routes
   * the user to the drivers page.
   */
  login() {
    this.pwdError = "";
    this.usernameError = "";
    this.authService.login(this.userName, this.passWord).subscribe((user) => {
      this.authService.setSession(user);

    })

    this.sleep(500).then( () => {
    if (sessionStorage.getItem("user_id")) {
      this.modalRef.dismiss();
      if (sessionStorage.getItem("user_id")) {
        this.router.navigate(["/home/riders"]);

      } else {
        this.router.navigate(["/home/drivers"]);
      }
    } else {
      this.loginFailed();
    }

  });
  }
}
