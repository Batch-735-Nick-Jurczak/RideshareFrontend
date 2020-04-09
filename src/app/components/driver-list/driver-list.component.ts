import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Driver } from 'src/app/models/driver';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  page = 1; // default page for pagination of driver table

  // map properties
  location = 'Morgantown, WV';
  mapProperties: {};

  // list of drivers
  drivers: Driver[] = [];

  // driver modal properties
  driverName: string;
  driverLocation: string;
  driverEmail: string;
  driverPhoneNumber: string;

  // set map properties
  @ViewChild('map', null) mapElement: any;
  map: google.maps.Map;

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit() {

    // get google api key to compute distance and duration
    this.getGoogleApi();

    // get drivers on page load
    this.userService.getRidersForLocation1(this.location).subscribe(
      drivers => this.drivers = this.getDistanceAndDuration(this.location, drivers));

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

      // get all routes and show drivers on map
      this.showDriversOnMap(this.location, this.drivers);
    });

  }

  /**
   * sleep sets a timeout for a desired duration
   * @param ms the number of milliseconds
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * getGoogleApi
   * TO-DO
   */
  getGoogleApi() {
      this.http.get(`${environment.loginUri}getGoogleApi`)
        .subscribe(
                  (response) => {
                      if (response['googleMapAPIKey'] !== undefined) {
                          new Promise((resolve) => {
                            const script: HTMLScriptElement = document.createElement('script');
                            script.addEventListener('load', () => resolve());
                            script.src = `http://maps.googleapis.com/maps/api/js?key=${response['googleMapAPIKey'][0]}`;
                            document.head.appendChild(script);
                      });
                }
            }
        );
    }

  /**
   * showDriversOnMap
   * TO-DO
   * @param origin rider's location
   * @param drivers available drivers
   */
  showDriversOnMap(origin, drivers) {
      drivers.forEach(element => {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
          draggable: true,
          map: this.map
        });
      this.displayRoute(origin, element.location, directionsService, directionsRenderer);
    });
  }

  /**
   * displayRoute
   * TO-DO
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
      }, (response, status) => {
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
   * @param driver available driver
   */
  addToModal(driver: Driver) {
    this.driverName = driver.name;
    this.driverLocation = driver.location;
    this.driverEmail = driver.email;
    this.driverPhoneNumber = driver.phoneNumber;
  }

  /**
   * addDrivers computes the distance and driving duration
   * between the current rider and each available driver.
   * It then populates the drivers property with 
   * driver information and the computed distance and duration
   * for each driver
   * @param origin rider's location
   * @param drivers available drivers
   */
  getDistanceAndDuration(origin, drivers): Driver[] {
    const  origins = [];
    // set origin to rider's location
    origins.push(origin);

    // initialize newDrivers to empty array
    // newDrivers will take information from
    // drivers and add distance and duration
    const newDrivers: Driver[] = [];

    drivers.forEach(element => {
      const location = element.hAddress + ',' + element.hCity + ',' + element.hState;
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix({
        origins,
        destinations: [location],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, (response, status) => {
        if (status !== 'OK') {
          console.log('Error was: ' + status);
        } else {
          const results = response.rows[0].elements;
          const distance = results[0].distance.text;
          const duration = results[0].duration.text;
          const id = element.userId;
          const name =  element.firstName + ' ' + element.lastName;
          const email = element.email;
          const phoneNumber = element.phoneNumber;
          console.log('in here');
          const newDriver = new Driver({
            id,
            name,
            location,
            email,
            phoneNumber,
            distance,
            duration});
          newDrivers.push(newDriver);
      }
    });

    });
    return newDrivers;
  }

}