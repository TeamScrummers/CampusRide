import { writeTripToDatabase, updateFromDatabase} from "./Database";

export class Trip {
    constructor(tripID, driver, passenger, startLocation, endLocation, fare, date) {
      this.tripID = tripID;
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
    static async makeTrip(driver, passenger) {
        const tripObj = new Trip('', driver, passenger, passenger.startLocation, driver.endLocation, 6, driver.latestArrival)
        tripObj.tripID = await writeTripToDatabase(tripObj)
        updateFromDatabase(`trips/${tripObj.tripID}`, { tripID: tripObj.tripID });
        return tripObj.tripID
    }

  /**
   * @brief Takes a trip object and converts it to JSON, JS date objs get converted to ISO format
   * @returns - A serialized JSON of the trip object
  */
    toJSON() {
      return {
        tripID: this.tripID,
        driver: this.driver,
        passenger: this.passenger, 
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
      const driver = data.driver
      const passenger = data.passenger 
      const trip = new Trip(
        data.tripID,
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