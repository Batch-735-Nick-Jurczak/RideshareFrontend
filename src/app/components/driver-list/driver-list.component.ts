/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, SkipSelf } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Batch } from 'src/app/models/batch';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car-service/car.service';
import { Router } from '@angular/router';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Driver } from 'src/app/models/driver';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
/**
 * Component that displays the map and driver table.
 */
export class DriverListComponent implements OnInit {

  // map properties
  /**
   * The current location of the user used to calculate the distance between drivers.
   */
  location: string = sessionStorage.getItem("haddress") + " " +
    sessionStorage.getItem("hcity") + "," + sessionStorage.getItem("hstate");

  /**
   * The current page for the pagination of the driver table.
   */
  page = 1;

  /**
   * The current pagesize for the number of items for 
   * the  pagination of the driver table.
   */
  pageSize = 5;

  /**
  * A list of map properties.
  */
  mapProperties: {};

  // list of drivers
  /**
   * The list of drivers loaded from the database to populate the table.
   */
  drivers: Driver[] = [];

  // driver modal properties
  /**
   * The Driver's name for use in populating the Model with Driver's information.
   */
  driverName: string;

  // Declare Google Map Variables
  @ViewChild('map', null)
  mapElement: any;
  map: google.maps.Map;

  /**
  * Constructor.
  * @param HttpClient used to make http requests to the server.
  * @param userService used to retrieve driver data.
  */
  constructor(private http: HttpClient, private userService: UserService) { }

  /**
  * Initializer for the Driver-List Component.
  */
  ngOnInit() {
    // get google api key to compute distance and duration
    this.getGoogleApi();

    // sleep for 1 second while the google 
    // API key is grabbed and then initilize the drivers
    this.sleep(1000).then(() => {
      this.userService.getRidersForBatch(1).subscribe(
        drivers => this.drivers = this.getDistanceAndDuration(this.location, drivers));
    })

    // wait 2000ms for api call to return drivers
    // then add driver locations and route to map
    this.sleep(2000).then(() => {
      // set map properties
      this.mapProperties = {
        center: new google.maps.LatLng(Number(sessionStorage.getItem('lat')), Number(sessionStorage.getItem('lng'))),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      // create map with specified properties
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);

      // get all routes
      // show drivers on map
      this.showDriversOnMap(this.location, this.drivers);
    });
  }

  /**
     * Function which sets a timeout for a desired duration.
     * @param ms the number of milliseconds
     */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * getGoogleApi gets the API key 
   * to be able to leverage the Google API
   */
  getGoogleApi() {
    this.http.get(`${environment.loginUri}getGoogleApi`)
      .subscribe(
        (response) => {
          if (response["googleMapAPIKey"] !== undefined) {
            new Promise((resolve) => {
              const script: HTMLScriptElement = document.createElement('script');
              script.addEventListener('load', () => resolve());
              script.src = `http://maps.googleapis.com/maps/api/js?key=${response["googleMapAPIKey"][0]}`;
              document.head.appendChild(script);
            });
          }
        }
      );
  }

  /**
  * showDriversOnMap a Function that renders 
  * Driver pins and routes on the Google Map.
  * @param origin rider's location
  * @param drivers available drivers
  */
  showDriversOnMap(origin, drivers) {
    drivers.forEach(element => {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: false,
        map: this.map
      });
      this.displayRoute(origin, element.origin, directionsService, directionsRenderer);
    });
  }

  /**
   * displayRoute is a Function called from ShowDriversOnMap to render Driver Routes.
   * @param origin rider's location
   * @param destination driver's location
   * @param service maps API directionsService
   * @param display maps API directionsRenderer
   */
  displayRoute(origin, destination, service, display) {
    service.route({
      origin,
      destination,
      travelMode: 'DRIVING',
      // avoidTolls: true
    }, function (response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  /**
   * addToModal responds to a click on a list item in the driver list
   * It then sets component properties - driverName and driverOrigin
   * @param driver takes the driver object 
   */
  addToModal(driver: Driver) {
    this.driverName = driver.name;
  }


  /**
   * getDistanceAndDuration computes the distance and driving duration
   * between the current rider and each available driver.
   * It then populates the drivers property with 
   * driver information and the computed distance and duration
   * for each driver
   * @param origin
   * @param drivers
   * @returns Drivers[] list of drivers with distance and time added
   */
  getDistanceAndDuration(origin, drivers): Driver[] {
    const origins = [];
    // set origin
    origins.push(origin);

    const newDrivers: Driver[] = [];

    drivers.forEach(element => {
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix({
        origins,
        destinations: [element.hAddress + " " + element.hCity + ',' + element.hState],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, function (response, status) {
        if (status !== 'OK') {
          alert('Error was: ' + status);
        } else if (sessionStorage.getItem("userid") == element.userId) {

        } else {
          const results = response.rows[0].elements;
          const id = element.userId;
          const name = element.firstName + ' ' + element.lastName;
          const origin = element.hAddress + " " + element.hCity + ',' + element.hState;
          const distance = results[0].distance.text;
          const time = results[0].duration.text;
          const newDriver = new Driver({
            id,
            name,
            origin,
            distance,
            time
          });
          newDrivers.push(newDriver);
        }
      });

    });
    return newDrivers;
  }

}