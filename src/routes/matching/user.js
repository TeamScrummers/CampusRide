// parent class
export class User {
  constructor (firstName, lastName, latestArrival) {
    // firstName & lastName in place of UID for now.
    this.firstName = firstName
    this.lastName = lastName
    this.latestArrival = latestArrival
  }

  // Checks if two date() objs are within less than 30 minutes of each other.
  compareTime (time1, time2) {
    const timeDiff = Math.abs(time1.getTime() - time2.getTime())
    if (timeDiff > 1800000) {
      return 'No Matches'
    }
    else {
      // Add to user pool here
      // or return specific matches that this user has
      // user pool addition can be in database or as simple as an array/list of users.
      return 'Match Found'
    }
  }

  EstimatedTimeOfArrival () {
  // Calculate when User will arrive at destination.
  // (Time to Pickup / Time to Campus)
  // Use mapBox directions to calculate distance between two users.
  }
}

// Child classes for later expansion
class Passenger extends User {
}

class Driver extends User {
}
