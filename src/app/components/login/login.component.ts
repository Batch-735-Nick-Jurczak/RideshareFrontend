import { Component, OnInit, NgModule, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

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

	failed: boolean = false;
	banned: boolean = false;

	pwdError: string;
	usernameError: string;
	userNotFound: string;
	modalRef: BsModalRef;
	/**
	 * This is a constructor
	 * @param http A HTTP Client is created.
	 * @param authService An auth service is injected.
	 *
	 */
	constructor(private modalService: BsModalService, private userService: UserService, private http: HttpClient, private authService: AuthService, public router: Router) { }

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
					`${user.firstName} ${user.lastName}: ${user.isDriver ? 'Driver' : 'Rider'}`.toLowerCase().startsWith(this.chosenUserFullName.toLowerCase())
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
	 * A toggle function
	 */

	toggleDropDown() {
		this.showDropDown = !this.showDropDown;
	}


	/**
	 * A function that indicate a fail to login
	 */


	loginFailed() {
		this.userName = '';
		this.failed = true;
	}

	loginBanned() {
		this.userName = '';
		this.banned = true;
	}

	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
  }


	/**
	 * A login function
	 */

	login() {
		this.pwdError = '';
		this.usernameError = '';

		this.http.get(`${environment.loginUri}?userName=${this.userName}&passWord=${this.passWord}`)
			.subscribe(
				(response) => {
					//console.log(response);
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
		/*this.http.get<User[]>(`${environment.userUri}?username=${this.userName}`)
			.subscribe((user: User[]) => {
				if (!user.length) {
					this.loginFailed();
				}
				else if(this.chosenUser.active == false){
					this.loginBanned();
				}
				else {
					if (!this.authService.login(user[0], this.chosenUser.userName)) {
						this.loginFailed();
					}
				}
			});*/
	}


}
