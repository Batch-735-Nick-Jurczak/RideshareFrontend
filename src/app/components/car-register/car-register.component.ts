import { Component, OnInit } from "@angular/core";
import { CarService } from "src/app/services/car-service/car.service";
import { ValidationService } from "src/app/services/validation-service/validation.service";
import { Car } from "src/app/models/car";
import * as jwt from "jwt-decode"

@Component({
  selector: "app-car-register",
  templateUrl: "./car-register.component.html",
  styleUrls: ["./car-register.component.css"]
})

/**
 * The Car Register component
 */
export class CarRegisterComponent implements OnInit {
  /**
   * Set years as an array of numbers
   * Set userId
   * Instantiates a car
   */

  years: number[] = [];
  username: number;
  car: Car = new Car();

  /**
   * This is the constructor
   * @param carService A dependency of a car service is injected
   * @param validationService A dependency of validation service is injected
   */

  constructor(
    private carService: CarService,
    public validationService: ValidationService
  ) {}

  /**
   * This is an OnInit function that sets the initial values
   */
  ngOnInit() {
    let currentYear = new Date().getFullYear();
    let availableYear = currentYear - 15;
    for (let i = availableYear; i <= currentYear; i++) {
      this.years.push(i);
      this.car.year = this.years[0];
    }

    let token = jwt(localStorage.getItem("id_token"));
    this.username = token.sub;
  }

  /**
   * Gets current year from selection and applies it to the car object
   * @param event
   * @returns {void}
   */
  changeYear(event) {
    let option = event.target.options.selectedIndex;
    this.car.year = this.years[option];
  }

  /**
   * Validates the number of seats and sends the info to
   * the car service so the data can be persisted
   */
  addCar() {
    if (this.validationService.validateSeats(this.car.seats)) {
      this.carService.createCar(this.car, this.username);
    }
  }
}
