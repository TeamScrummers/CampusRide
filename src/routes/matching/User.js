export class User {
  constructor(userId, firstName, lastName, phoneNumber, startLocation = null, endLocation = null, vehicleType, available = false, latestArrival = null) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.startLocation = startLocation;
    this.endLocation = endLocation;
    this.vehicleType = vehicleType;
    this.available = available;
    this.latestArrival = latestArrival;
  }

  // Create a User object to JSON data
  toJSON() {
    return {
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      startLocation: this.startLocation,
      endLocation: this.endLocation,
      vehicleType: this.vehicleType,
      available: this.available,
      latestArrival: this.latestArrival,
    };
  }

  // Create a User object from JSON data
  static fromJSON(data) {
    const user = new User(data.userId, data.firstName, data.lastName, data.phoneNumber, data.startLocation, data.endLocation, data.vehicleType, data.available, data.latestArrival);
    return user;
  }
}
