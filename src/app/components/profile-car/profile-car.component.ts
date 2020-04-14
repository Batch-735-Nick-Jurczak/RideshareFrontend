import { Component, OnInit } from "@angular/core";
import { CarService } from "src/app/services/car-service/car.service";
import { Car } from "src/app/models/car";
import * as jwt from "jwt-decode";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user-service/user.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-profile-car",
  templateUrl: "./profile-car.component.html",
  styleUrls: ["./profile-car.component.css"],
})

/**
 * The profile-car component is where a user can view their car and update it.
 */
export class ProfileCarComponent implements OnInit {
  currentUser: User;
  currentCar: Car;
  success: string;
  carProfileForm;


  /**
   * The Constructor gets a car service and user service injected.
   * 
   * @param carService 
   * @param userService 
   */
  constructor(
    private carService: CarService,
    private userService: UserService
  ) {}
  /**
   * The OnInit function creates a reactive form and gets the token from local storage. Then we get the username from the token and set the current user to that user by making a call to the user controller. Then, we're using the
   * car service to get the current car from the car endpoint for that user to populate their current car.
   */
  ngOnInit() {


    this.carProfileForm = new FormGroup({
      make: new FormControl("", [Validators.required]),
      model: new FormControl("", [Validators.required]),
      seats: new FormControl(),
    });

    let token = jwt(localStorage.getItem("id_token"));

    this.userService.getUserByUserName(token.sub).subscribe((response) => {
      this.currentUser = response;
      console.log(this.currentUser);
      this.carService
        .getCarByUserId2(this.currentUser.userId.toString())
        .subscribe((response) => {
          this.currentCar = response;
          console.log(this.currentCar)
          this.make.setValue(response.make ? response.make : "No Car Entered");
          this.model.setValue(response.model ? response.model : "No Car Entered");
          this.seats.setValue(response.seats);
        });
    });


  }
/**
 * These are the getters for the form.
 */
  get make(){
    return this.carProfileForm.get("make");
  }
  get model(){
    return this.carProfileForm.get("model");
  }
  get seats(){
    return this.carProfileForm.get("seats");
  }


  /**
   * This updates the users car information (currently not working) to the web server.
   */
  updatesCarInfo() {
    this.currentCar.make = this.make.value;
    this.currentCar.model = this.model.value;
    this.currentCar.seats = this.seats.value;
    console.log(this.currentCar)
    this.carService.updateCarInfo(this.currentCar,this.currentCar.carId).catch(d=>console.log(d));
    this.success = "Updated Successfully!";
  }
}
