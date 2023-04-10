export class Trip {
    constructor(tripId, driver, passengers, startLocation, endLocation, fare, date) {
      this.tripId = tripId;
      this.driver = driver;
      this.passengers = passengers;
      this.startLocation = startLocation;
      this.endLocation = endLocation;
      this.fare = fare;
      this.date = date;
    }
  
    // Convert Trip object to JSON data
    toJSON() {
      return {
        tripId: this.tripId,
        driver: this.driver.toJSON(), // calling User.js toJSON()
        passengers: this.passengers.map((passenger) => passenger.toJSON()), // calling User.js toJSON()
        startLocation: this.startLocation,
        endLocation: this.endLocation,
        fare: this.fare,
        date: this.date,
      };
    }
  
    // Create Trip object from JSON data
    static fromJSON(data) {
      const driver = User.fromJSON(data.driver); // calling User.js toJSON()
      const passengers = data.passengers.map((passenger) => User.fromJSON(passenger)); // calling User.js fromJSON()
      const trip = new Trip(
        data.tripId,
        driver,
        passengers,
        data.startLocation,
        data.endLocation,
        data.fare,
        data.date
      );
      return trip;
    }
  }
  