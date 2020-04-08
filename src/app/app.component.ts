import { Component } from '@angular/core';
import { } from 'googlemaps';


/**
 * This is the App Component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * This is the title of the Application.
   */
  title = 'rideshare-frontend';
  googleMapAPIKey: string;

  constructor() { }

  ngOnInit() {
    // const lat = null;
    // const lng = null;
    // const geocoder = new google.maps.Geocoder()
    // geocoder.geocode({
    //   address: sessionStorage.getItem("hcity")
    // }, function (results, status) {
    //   if (status === 'OK') {
    //     const result = results[0].geometry.location
    //     const lat = result.lat()
    //     const lng = result.lng()
    //     const latLng = {
    //       lat,
    //       lng
    //     }
    //   }
    //   console.log("lat: " + lat);
    //   console.log("lng: " + lng);
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function (position) {
    //       sessionStorage.setItem("lat", lat + ""),
    //         sessionStorage.setItem("lng", lng + "")
    //     })
    //   }
    // })
  }
}
