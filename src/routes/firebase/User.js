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

    returnsTrue(){
        return true;
    }
}