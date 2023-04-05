export class Driver {
  constructor(name, phoneNumber, vehicleType, available) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.vehicleType = vehicleType;
    this.available = available;
  }

  // Create a Driver object to JSON data
  toJSON() {
    return {
      name: this.name,
      phoneNumber: this.phoneNumber,
      vehicleType: this.vehicleType,
      available: this.available,
    };
  }
  
  // Create a Driver object from JSON data
  static fromJSON(data) {
    const driver = new Driver(data.name, data.phoneNumber, data.vehicleType);
    driver.available = data.available;
    return driver;
  }

}

export class Passenger {
  constructor(name, phoneNumber, pickupLocation, destination) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.pickupLocation = pickupLocation;
    this.destination = destination;
  }
}

export class MatchedRide extends Driver {
  constructor(driver, passenger, tripPrice) {
    super(driver.name, driver.phoneNumber, driver.vehicleType);
    this.pickupLocation = passenger.pickupLocation;
    this.destination = passenger.destination;
    this.tripPrice = tripPrice;
  }
}
