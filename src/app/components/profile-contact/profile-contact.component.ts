import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user-service/user.service";
import { Router } from "@angular/router";
import { User } from "src/app/models/user";

@Component({
  selector: "app-profile-contact",
  templateUrl: "./profile-contact.component.html",
  styleUrls: ["./profile-contact.component.css"],
})
export class ProfileContactComponent implements OnInit {
  /**
   *Created a user to hold the current user information comming from 
   *database
   */
  profileObject: User;
  /**
   *Create variables to hold the information in the form
   * 
   */
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /**
   *Variable to hold the success or fail status that will be recieved from the database
   */
  success: string;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    /**
     *calling the user service to get the current users information
     */
    this.userService
      .getUserById2(sessionStorage.getItem("userid"))
      .subscribe((response) => {
        console.log(response)
        /**
         *setting the current user to the local user profile
         */
        this.profileObject = response;
        /**
         *Setting the current logged in users info to the form information via ngModel.
         */
        this.firstName = this.profileObject.firstName;
        this.lastName = this.profileObject.lastName;
        this.email = this.profileObject.email;
        this.phone = this.profileObject.phoneNumber;
      });
  }
  /**
   *Function that will submit the updated changes to the database
   */
  updatesContactInfo({ value, valid }: { value: User; valid: Boolean }) {

    /**
     * Updating the current users information with the information from the form.
     */
    this.profileObject.firstName = this.firstName;
    this.profileObject.lastName = this.lastName;
    this.profileObject.email = this.email;
    this.profileObject.phoneNumber = this.phone;
    /**
     * Calling the user service to update the current users information
     */
    let message = this.userService.updateUserInfo(this.profileObject);
    /**
     * updating the successtatus.
     */
    this.success = "Updated Successfully!";
    console.log(message);
  }
}
