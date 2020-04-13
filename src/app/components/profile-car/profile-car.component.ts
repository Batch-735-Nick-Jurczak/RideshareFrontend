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
export class ProfileCarComponent implements OnInit {
  currentUser: User;
  currentCar: Car;
  success: string;
  carProfileForm;

  constructor(
    private carService: CarService,
    private userService: UserService
  ) {}
  /**
   * The OnInit function gets the token from local storage. THen we get the username from the token and set the current user to that user by making a call to the user controller. Then, we're using the
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

      this.carService
        .getCarByUserId2(this.currentUser.userId.toString())
        .subscribe((response) => {
          this.currentCar = response;
          this.make.setValue(response.make ? response.make : "No Car Entered");
          this.model.setValue(response.model ? response.model : "No Car Entered");
          this.seats.setValue(response.seats);
        });
    });


  }

  get make(){
    return this.carProfileForm.get("make");
  }
  get model(){
    return this.carProfileForm.get("model");
  }
  get seats(){
    return this.carProfileForm.get("seats");
  }

  updatesCarInfo() {
    this.currentCar.make = this.make;
    this.currentCar.model = this.model;
    this.currentCar.seats = this.seats;
    this.carService.updateCarInfo(this.currentCar);
    this.success = "Updated Successfully!";
  }
}
