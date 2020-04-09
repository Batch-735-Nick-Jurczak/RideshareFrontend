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
export class DriverListComponent implements OnInit {

  location: string = sessionStorage.getItem("haddress") + " " + sessionStorage.getItem("hcity") + "," + sessionStorage.getItem("hstate");

  page = 1;
  pageSize = 5;
  mapProperties: {};
  availableCars: Array<any> = [];
  drivers: Driver[] = [];
  driverName: string;
  driverOrigin: string;

  @ViewChild('map', null)
  mapElement: any;
  map: google.maps.Map;

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit() {
    this.getGoogleApi();
    this.sleep(1000).then(() => {
      this.userService.getRidersForBatch(1).subscribe(
        drivers => this.drivers = this.getDistanceAndDuration(this.location, drivers));
    })
    // this.getGoogleApi();

    this.sleep(2000).then(() => {
      this.mapProperties = {
        center: new google.maps.LatLng(Number(sessionStorage.getItem('lat')), Number(sessionStorage.getItem('lng'))),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
      // get all routes
      // show drivers on map
      this.showDriversOnMap(this.location, this.drivers);
    });
  }

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
          // console.log(response);
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
   * showDriversOnMap displays the pin for 
   * the location of the driver on the Google Map
   * @param origin
   * @param drivers
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
   * displayRoute displays the route between the rider's location
   * and each driver's location on the map
   * @param origin
   * @param destination
   * @param service
   * @param display
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
    this.driverOrigin = driver.origin;
  }


  /**
   * getDistanceAndDuration computes the distance and driving duration
   * between the current rider and each available driver.
   * It then populates the drivers property with 
   * driver information and the computed distance and duration
   * for each driver
   * @param origin
   * @param drivers
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