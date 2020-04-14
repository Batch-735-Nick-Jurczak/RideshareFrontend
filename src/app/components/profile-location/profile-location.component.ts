import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import {} from 'googlemaps';
import { HttpClient } from '@angular/common/http';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})


 
export class ProfileLocationComponent implements OnInit {
 @ViewChild('map', {static: true}) mapElement: any;
    map: google.maps.Map;
    @ViewChild("placesRef",{static: true}) placesRef : GooglePlaceDirective;
    
    public handleAddressChange(address: Address) {
    // Do some stuff
}

    showAddress2:Boolean=false;
  zipcode: number;
  city:string;
  address:string;
  address2:string;
  hState: string;
  currentUser: User;
  success :string;
  /**
   * 
   */
    options = {
      types:[],
      componentRestrictions: { country: ['US'] },
    }

  

    /**
     * 
     * @param userService 
     */
  constructor(private userService: UserService) { }

  ngOnInit() {

   this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.currentUser = response;
      this.zipcode = response.hZip;
      this.city = response.hCity;
      this.address = response.hAddress;
      this.address2 = response.wAddress;
      this.hState = response.hState;
    });
  }

  updatesContactInfo(){
    this.currentUser.hZip = this.zipcode;
    this.currentUser.hCity = this.city;
    this.currentUser.hAddress = this.address;
    this.currentUser.wAddress = this.address2;
    this.currentUser.hState = this.hState;
    //console.log(this.currentUser);
    this.userService.updateUserInfo(this.currentUser);
    this.success = "Updated Successfully!";
  }

  public setFields($event){
    console.log($event)
    let streetaddy="";
  for (let index = 0; index < $event.address_components.length; index++) {
    let type = $event.address_components[index].types[0];
      console.log(type);
    if (type === "street_number") {
      streetaddy = ($event.address_components[index].long_name);
      }
     else if (type === "route") {
      streetaddy= streetaddy + " " + ($event.address_components[index].long_name);
    } else if (type === "locality") {
      this.city = ($event.address_components[index].long_name);
    } else if (type === "administrative_area_level_1") {
      this.hState = ($event.address_components[index].short_name);
    }
    else if (type === "postal_code") {
      this.zipcode = ($event.address_components[index].long_name);
    } 
    else {
    }
  }
  this.address=$event.adr_address;
  this.address2="";
}
showAddress(){
  this.showAddress2=!this.showAddress2
}
}
