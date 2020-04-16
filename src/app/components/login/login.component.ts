import { Component, OnInit, NgModule, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';

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

	failed: boolean = false;
	banned: boolean = false;

	pwdError: string;
  usernameError: string;
	userNotFound: string;
  modalRef :BsModalRef;

	/**
	 * This is a constructor
	 * @param http A HTTP Client is created.
	 * @param authService An auth service is injected.
	 *
	 */
	constructor(private modalService :BsModalService,private authService: AuthService) { }

	ngOnInit() {
	}


	/**
	 * A function that indicate a fail to login
	 */


	loginFailed() {
		this.userName = '';
		this.failed = true;
	}

	loginBanned(){
		this.userName = '';
		this.banned = true;
	}

	openModal(template :TemplateRef<any>){
		this.modalRef = this.modalService.show(template);
  }


	/**
	 * A login function
	 */

	login() {
		this.pwdError ='';
    this.usernameError= '';
    let auth = this.authService.login(this.userName, this.passWord);
    console.log(auth);
    if(!auth){
      this.loginFailed();
    }else {
      this.modalService.hide(0);
    }

	}


}
