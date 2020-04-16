import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import {} from 'googlemaps';
import { HttpClient } from '@angular/common/http';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import * as jwt from "jwt-decode";
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})


export class ProfileLocationComponent implements OnInit {

  /**
   * Referencing Google Places Directive from the google autocomplete package
   */
    @ViewChild("placesRef",{static: true}) placesRef : GooglePlaceDirective;

 /**
  *  toggle for hiding and showing the second address;
  */
  showAddress2:Boolean=false;
  /**
   * address information that will be manipulated via ngModel
   */

formattedAddress:any = "";
  currentUser:User;
  zipcode: number;
  city:string;
  address:string;
  address2:string;
  hState: string;
  /**
   * initialzing a variable to hold the User object
   */
/**
 * Placeholder variables for when validation comes back from the database
 * we can print the success or the error to the screen
 */
  success :string;
  fail:string;
  /**
   * Optional options for the google-autocomplete package, limits our field of addresses
   */
    options = {
      types:[],
      componentRestrictions: { country: ['US'] },
    }

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
  }

  updatesContactInfo(){
    /**
     * taking the input from the form and assigning the values back to the user
     */
    this.currentUser.hZip = this.zipcode;
    this.currentUser.hCity = this.city;
    this.currentUser.hAddress = this.address;
    this.currentUser.wAddress = this.address2;
    this.currentUser.hState = this.hState;
    /**
     * Making a call to the user service to update the user information in the database
     */
    this.userService.updateUserInfo(this.currentUser);

    /**
     * Display if the call was successfull. Using the google maps api it should be successful
     * along with the form validation, the user can only submit good addresses.
     */
    this.success = "Updated Successfully!";
  }
/**
 * setFields function is used to take the autocompleted information and set it the corresponding
 * address values.
 * @param $event is passed in from the form, it houses the google-autocomplete event information
 * to be loop through
 */
  public setFields($event){
    /**
     * initialze a variable to hold the short hand address coming from the autocomplete
     */
    let streetaddy="";
        /**
     * Looping throug the event's array address component which holds different parts of an address.
     * Each part of the address is given a "type" that can be matched and then the information extracted
     */
  for (let index = 0; index < $event.address_components.length; index++) {
    /**
     * setting the "type" from the given inde
     */
    let type = $event.address_components[index].types[0];
    /**
     * if the type of the given address component at the given index is equal
     * to street_number. the value is set to the variable streetaddy to be later used
     * to build the rest of the street address.
     */
    if (type === "street_number") {
      streetaddy = ($event.address_components[index].long_name);
      }
       /**
     * if the type of the given address component at the given index is equal
     * to route. the value is added to the variable streetaddy to build the rest of the street address.
     */
     else if (type === "route") {
      streetaddy= streetaddy + " " + ($event.address_components[index].long_name);
    }
     /**
     * Getting the city and setting it to the field
     */
    else if (type === "locality") {
      this.city = ($event.address_components[index].long_name);
    }      /**
    * Getting the state and setting it to the field
    */
    else if (type === "administrative_area_level_1") {
      this.hState = ($event.address_components[index].short_name);
    }
         /**
     * Getting the zipcode and setting it to the field
     */
    else if (type === "postal_code") {
      this.zipcode = ($event.address_components[index].long_name);
    }
    else {
    }
  }
  /**
   * Setting the address field to be the street number and name as
   * well as clearing out the second address field.
   */
  this.address=streetaddy;
  this.address2="";
}
  /**
   * showAddress function toggles the second address input field
   */
showAddress(){
  this.showAddress2=!this.showAddress2
}


  // updatesContactInfo(){
  //   this.currentUser.hZip = this.zipcode;
  //   this.currentUser.hCity = this.city;
  //   this.currentUser.hAddress = this.address;
  //   this.currentUser.wAddress = this.address2;
  //   this.currentUser.hState = this.hState;
  //   this.userService.updateUserInfo(this.currentUser);
  //   this.success = "Updated Successfully!";
  // }


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

}
