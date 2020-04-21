import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import * as jwt from "jwt-decode";
@Component({
  selector: 'app-profile-membership',
  templateUrl: './profile-membership.component.html',
  styleUrls: ['./profile-membership.component.css']
})
export class ProfileMembershipComponent implements OnInit {
  profileObject : User;
  currentUser: any = '';
  isDriver: boolean;
  active: boolean;
  success: string;
  constructor(private userService: UserService) { }
  ngOnInit() {
    
    let token = jwt(localStorage.getItem("id_token"));

    this.currentUser = this.userService.getUserByUserName(token.sub).subscribe((response)=>{
      this.profileObject = response;
    });
  }
  updatesMembershipInfo(){
    this.profileObject.driver = this.isDriver;
    this.profileObject.active = this.active;
    this.userService.updateUserInfo(this.profileObject);
    this.success = "Updated Successfully!";
  
  }
}
