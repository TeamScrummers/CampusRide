import { User } from "../matching/User";
import { writeTripToDatabase } from "./Database";

export class Trip {
    constructor(tripId, driver, passenger, startLocation, endLocation, fare, date) {
      this.tripId = tripId;
      this.driver = driver;
      this.passenger = passenger;
      this.startLocation = startLocation;
      this.endLocation = endLocation;
      this.fare = fare;
      this.date = date ? new Date(date) : null;
    }

    /**
     * @brief Takes an array of two user objects to make a trip object out of.
     * @param {object} driver - User object that represents the driver
     * @param {object} passenger - User object that represents the passenger
     * @returns - New Trip Obj based off of user pair & db data
    */
    static makeTrip(driver, passenger) {
        //console.log(driver)
        const tripObj = new Trip(null, driver, passenger, passenger.startLocation, driver.endLocation, 10, driver.latestArrival)
        tripObj.tripId = writeTripToDatabase(tripObj)
        return tripObj
    }

  /**
   * @brief Takes a trip object and converts it to JSON, JS date objs get converted to ISO format
   * @returns - A serialized JSON of the trip object
  */
    toJSON() {
      return {
        tripId: this.tripId,
        driver: this.driver.toJSON(), // calling User.js toJSON()
        passenger: this.passenger.toJSON(), // calling User.js toJSON()
        startLocation: this.startLocation,
        endLocation: this.endLocation,
        fare: this.fare,
        date: this.date ? this.date.toISOString() : null,
      };
    }
  
  /**
   * @brief Takes JSON and converts it to trip object, ISO format gets converted to js date objects
   * @param {object} data - A JSON with relevant data
   * @returns - An object of Trip class
  */
    static fromJSON(data) {
      const driver = User.fromJSON(data.driver); // calling User.js fromJSON()
      const passenger = User.fromJSON(data.passenger) // calling User.js fromJSON()
      const trip = new Trip(
        data.tripId,
        driver,
        passenger,
        data.startLocation,
        data.endLocation,
        data.fare,
        data.date ? new Date(data.date) : null,
      );
      return trip;
    }
  }