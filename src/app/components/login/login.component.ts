import { Component, OnInit, NgModule, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})


/**
 * This is the login component
 */
export class LoginComponent implements OnInit {

	/**
	 * Sets name string variable to the chosen user
	 * Sets pagination
	 */

	userName: string = '';
	passWord: string = '';
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
  modalRef :NgbModalRef;

	/**
	 * This is a constructor
	 * @param http A HTTP Client is created.
	 * @param authService An auth service is injected.
	 *
	 */
	constructor(private modalService :NgbModal,private authService: AuthService, private userService: UserService, private http: HttpClient) { }

	/**
	 * When the component is initialized, the system checks
	 * for the session storage to validate. Once validated,
	 * the user service is called to retrieve all users.
	 */
	ngOnInit() {
		this.userService.getAllUsers()
			.subscribe(allUsers => {
				this.allUsers = allUsers;
				this.totalPage = Math.ceil(this.allUsers.length / 5);
				this.users = this.allUsers.slice(0, 5);
			});
	}

	/**
	 * A function that allows the user to choose an account to log in as
	 * @param user
	 */
	changeUser(user) {
		this.showDropDown = false;
		this.curPage = 1;
		this.totalPage = Math.ceil(this.allUsers.length / 5);
		this.users = this.allUsers.slice(this.curPage * 5 - 5, this.curPage * 5);
		this.chosenUserFullName = `${user.firstName} ${user.lastName}: ${user.driver ? 'Driver' : 'Rider'}`;
		this.chosenUser = user;
	}

	/**
	 * A GET method the fetches all the users
	 */
	searchAccount() {
		this.showDropDown = true;
		if (this.chosenUserFullName.length) {
			this.users = this.allUsers.filter(user => {
				return (
					user.firstName.toLowerCase().startsWith(this.chosenUserFullName.toLowerCase()) ||
					user.lastName.toLowerCase().startsWith(this.chosenUserFullName.toLowerCase()) ||
					`${user.firstName} ${user.lastName}`.toLowerCase().startsWith(this.chosenUserFullName.toLowerCase()) ||
					`${user.firstName} ${user.lastName}: ${user.driver ? 'Driver' : 'Rider'}`.toLowerCase().startsWith(this.chosenUserFullName.toLowerCase())
				);
			});
			this.totalPage = Math.ceil(this.users.length / 5);
		} else {
			this.curPage = 1;
			this.totalPage = Math.ceil(this.allUsers.length / 5);
			this.users = this.allUsers.slice(this.curPage * 5 - 5, this.curPage * 5);
		}
	}

	/**
	 * A toggle function to show the dropdown
	 */
	toggleDropDown() {
		this.showDropDown = !this.showDropDown;
	}

	/**
	 * Set next page
	 */
	nextPage() {
		this.curPage++;
		this.users = this.allUsers.slice(this.curPage * 5 - 5, this.curPage * 5);
	}

	/**
	 * Set prev page
	 */
	prevPage() {
		this.curPage--;
		this.users = this.allUsers.slice(this.curPage * 5 - 5, this.curPage * 5);
	}

	/**
	 * A function that indicate a fail to login
	 */
	loginFailed() {
		this.userName = '';
		this.failed = true;
	}

	/**
	 * A function that sets user as banned
	 */
	loginBanned() {
		this.userName = '';
		this.banned = true;
	}

	openModal(template :TemplateRef<any>){
		this.modalRef = this.modalService.open(template);
  }


	/**
	 * A login function that checks if the user information
	 * is correct in the database, if true then it routes
	 * the user to the drivers page.
	 */
	login() {
		this.pwdError = '';
		this.usernameError = '';

		this.http.get(`${environment.loginUri}?userName=${this.userName}&passWord=${this.passWord}`)
			.subscribe(
				(response) => {
					if (response["userName"] != undefined) {
						this.usernameError = response["userName"][0];
					}
					if (response["passWord"] != undefined) {
						this.pwdError = response["pwdError"][0];
					}
					if ((response["name"] != undefined) && (response["userid"] != undefined)) {
						sessionStorage.setItem("name", response["name"]);
						sessionStorage.setItem("userid", response["userid"]);
						sessionStorage.setItem("hcity", response["hcity"]);
						sessionStorage.setItem("haddress", response["haddress"]);
						sessionStorage.setItem("hstate", response["hstate"]);

						//call landing page
						//this.router.navigate(['landingPage']);
						location.replace('drivers');
					}
					if (response["userNotFound"] != undefined) {
						this.userNotFound = response["userNotFound"][0];
					}
				}
			);
	}
}
