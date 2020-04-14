import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user-service/user.service";
import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { analyzeAndValidateNgModules } from "@angular/compiler";

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

  constructor(private router: Router, private userService: UserService) {}

  /**
   *Variable to hold the success or fail status that will be recieved from the database
   */
  success: string;

  ngOnInit() {
    /**
     *calling the user service to get the current users information
     */
    this.userService
      .getUserById2(sessionStorage.getItem("userid"))
      .subscribe((response) => {
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
    this.success = "Updated Successfully!";
    let err = this.userService
      .updateUserInfo(this.profileObject)
      .catch((d) => this.displayResults(d.error.errors));
  }

  /**
   * The displayResults function is used to display the error validations from the backend. 
   * @param results are the results from the error log
   */
  displayResults(results) {
    /**
     * holds fthe value of the response to be given to the user.
     */
    let respon = "";
    if (results.length ==1 ) {
      switch(results[0].field.toString()){
        case "email":
          this.success = "Invalid Email was given!";
         break;
         case "lastName":
          this.success = "Invalid Last Name was given!";
         break;
         case "firstName":
         this.success =  "Invalid First Name was given!";
         break;
         case "phoneNumber":  
         this.success =  "Invalid Phone Number was given!";
         break;
         default:
          this.success = "Failed to process request";            
        }
    }else{
      for(let i=0;i<results.length;i++){
        let reFormResult;
        if(i!=results.length-1){
          switch(results[i].field.toString()){
            case "email":
              reFormResult = "Invalid Email";
             break;
             case "lastName":
              reFormResult = "Invalid Last Name";
             break;
             case "firstName":
            reFormResult =  "Invalid First Name";
             break;
             case "phoneNumber":  
             reFormResult =  "Invalid Phone Number";
             break;           
            }
          respon = respon +reFormResult + ", ";
        }else{
          switch(results[i].field.toString()){
            case "email":
              reFormResult = "Invalid Email";
             break;
             case "lastName":
              reFormResult = "Invalid Last Name";
             break;
             case "firstName":
            reFormResult =  "Invalid First Name";
             break;
             case "phoneNumber":  
             reFormResult =  "Invalid Phone Number";
             break;           
            }
          respon = respon + " and " +reFormResult + " was given!";
        }
      }
      this.success = respon;
    }
  }
}
