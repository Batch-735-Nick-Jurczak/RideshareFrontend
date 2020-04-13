import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import * as jwt from "jwt-decode";
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';



@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})
export class ProfileLocationComponent implements OnInit {

formattedAddress:any = "";
  currentUser:User;
  zipcode: number;
  city:string;
  address:string;
  address2:string;
  hState: string;
  success :string;

  location_s : string =''; //sample: Morgantown, WV
 

  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;
  
  mapProperties :{};

  constructor(private http: HttpClient,private userService: UserService) { }

  ngOnInit() {
    
//this.getGoogleApi();
  


    let token = jwt(localStorage.getItem("id_token"));
    this.userService.getUserByUserName(token.sub).subscribe((response) => {
      console.log(response);
      this.currentUser = response;
      this.zipcode = response.hZip;
      this.city = response.hCity;
      this.address = response.hAddress;
      this.hState = response.hState;
  });

  // updatesContactInfo(){
  //   this.currentUser.hZip = this.zipcode;
  //   this.currentUser.hCity = this.city;
  //   this.currentUser.hAddress = this.address;
  //   this.currentUser.wAddress = this.address2;
  //   this.currentUser.hState = this.hState;
  //   this.userService.updateUserInfo(this.currentUser);
  //   this.success = "Updated Successfully!";
  // }
}

// public setFields($event){
//   for (let index = 0; index < $event.address_components.length; index++) {
//     let type = $event.address_components[index].types[0];
//     console.log(type);
//     if (type === "street_number") {
//       this.address = ($event.address_components[index].long_name);
//       }
//     //  else if (type === "route") {
//     //   this.customer.street = this.customer.street + " " + ($event.address_components[index].long_name);
//     // } else if (type === "locality") {
//     //   this.customer.city = ($event.address_components[index].long_name);
//     // } else if (type === "administrative_area_level_1") {
//     //   this.customer.state = ($event.address_components[index].short_name);
//     // }
//     else if (type === "postal_code") {
//       this.zipcode = ($event.address_components[index].long_name);
//     } 
//     else {
//     }
//   }
// }

getGoogleApi()  {
  this.http.get(`${environment.loginUri}/getGoogleApi`)
     .subscribe(
               (response) => {
                   console.log(response);
                   if(response["googleMapAPIKey"] != undefined){
                       new Promise((resolve) => {
                         let script: HTMLScriptElement = document.createElement('script');
                         script.addEventListener('load', r => resolve());
                         script.src = `http://maps.googleapis.com/maps/api/js?libraries=places&key=${response["googleMapAPIKey"][0]}`;
                         document.head.appendChild(script);      
                   }); 
             }    
         }
     );
 }

 public handleAddressChange(address: any) {
  this.formattedAddress=address.formatted_address;
}

options={

}

}
