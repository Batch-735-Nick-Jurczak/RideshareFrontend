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
  profileObject: User;
  currentUser: any = "";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  success: string;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.currentUser = this.userService
      .getUserById2(sessionStorage.getItem("userid"))
      .subscribe((response) => {
        this.profileObject = response;

        this.firstName = this.profileObject.firstName;
        this.lastName = this.profileObject.lastName;
        this.email = this.profileObject.email;
        this.phone = this.profileObject.phoneNumber;
      });
  }

  updatesContactInfo() {
    this.profileObject.firstName = this.firstName;
    this.profileObject.lastName = this.lastName;
    this.profileObject.email = this.email;
    this.profileObject.phoneNumber = this.phone;
    this.success = "Updated Successfully!";
    let err = this.userService
      .updateUserInfo(this.profileObject)
      .catch((d) => this.displayResults(d.error.errors));
  }
  displayResults(results) {
    console.log(results);
    console.log(results[0].field);
    console.log(results.length);
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
