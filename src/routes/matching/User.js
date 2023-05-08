export class User {
  constructor(firstName, lastName, phoneNumber, startLocation = null, endLocation = null, available = false, latestArrival = null, mode) {
    if (!firstName || !lastName || !phoneNumber) {
      throw new Error('Required user data is missing');
    }

    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.startLocation = startLocation;
    this.endLocation = endLocation;
    this.available = available;
    this.latestArrival = latestArrival ? new Date(latestArrival) : null;
    this.mode = mode;
  }

  // Create a User object to JSON data
  toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      startLocation: this.startLocation,
      endLocation: this.endLocation,
      available: this.available,
      latestArrival: this.latestArrival ? this.latestArrival.toISOString() : null,
      mode: this.mode,
    };
  }

  /**
   * @brief Takes JSON and converts it to user.prototype object
   * @param {object} data - A JSON with data
   * @returns - An object of User class
  */
  static fromJSON(data) {
    const user = new User(
      data.firstName,
      data.lastName,
      data.phoneNumber,
      data.startLocation,
      data.endLocation,
      data.available,
      data.latestArrival ? new Date(data.latestArrival) : null,
      data.mode
    );
    return user;
  }
}
