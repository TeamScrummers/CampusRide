// Import match making pool
// This should be a DB call later.
import { get, writable } from "svelte/store";
import { matchMakingPool, waitingPool } from "../firebase/Store";

const thirtyMinutesFromNow = new Date(Date.now() + 30 * 60000);

/**
 * Adds object Svelte store array matchMakingPool[] using obj.update().
 * @param {object} newObject - The object to added to matchMakingPool[].
*/
function addMatchMakingObject(newObject) {
  matchMakingPool.update(arr => [...arr, newObject]);
}

/**
 * Adds object Svelte store array waitingPool[] using obj.update().
 * @param {object} newObject - The object to added to waitingPool[].
*/
function addWaitingObject(newObject) {
  waitingPool.update(arr => [...arr, newObject]);
}


/**
 * Remove a user from the match making pool.
 * @param {object} user - The user to remove from the match making pool.
*/
export function removeFromMatchMaking(user) {
  // getting from svelte store then returning to svelte store
  const index = get(matchMakingPool).findIndex((obj) => obj === user);
  if (index !== -1) {
    matchMakingPool.update(arr => {
      arr.splice(index, 1);
      return arr;
    });
  }
}


/**
 * (NOTE: If this is suppose to refresh the matchingmaking queue every * secs  )
 * (it might not want to take a user obj but instead the entire matchMakingPool)
 * Refreshes user's position in match making queue. 
 * @param {object} user - The user to refresh position in matchmaking queue.
*/
export function refreshMatchMaking(user) {
  if (user.latestArrival <= thirtyMinutesFromNow) {
    // in match making pool
    addMatchMakingObject(user)
    console.log("User added to matchMakingPool.")
  }
  else if (user.latestArrival > thirtyMinutesFromNow) {
    // scheduled for match making
    addWaitingObject(user)
    console.log("User added to waitingPool.")
  }

  else {
    // make this a try/catch block later
    // Q: if latestArrival is earlier than current time what happens?
    console.log("ERROR: latestTimeofArrival error")
  }
}


/*
method parameters: 
user sets latestArrival
user is added to waiting pool (the queue)
if user time is within 30 min we add them to the active searching pool (matchmaking)
Find a match and remove both parties from the pool
once both sides confirm their trip it is scheudled and recorded in the db and we post them to a routing page w/ geolocation data
at any point a user should be able to cancel the ride so we must address the edge cases that occur 
we must handle poor user input for the lateast arrival time 
*/

/**
 * Parses through userPool & selects a solid pair of drivers/passenger
 * based off of their obj.mode & smallest difference in obj.latestArrival data.
 * @param {Array<object>} userPool - An array of user objects to search through for the best match.
 * @returns {Array<objects>} - An array with the matched driver and passenger objects.
*/
export function matchMake(userPool) {
  // Filter users to only include drivers and passengers
  const drivers = userPool.filter(user => user.mode === 'driver');
  const passengers = userPool.filter(user => user.mode === 'passenger');

  // Find smallest difference in latestArrivals
  let smallestDifference = Infinity; // upper limit for time difference
  let bestMatch = null;
  for (const driver of drivers) {
    for (const passenger of passengers) {
      const timeDifference = Math.abs(driver.latestArrival - passenger.latestArrival);
      if (timeDifference < smallestDifference) {
        smallestDifference = timeDifference;
        bestMatch = { driver, passenger };
      }
    }
  }

  // Remove matched users from matchmaking pool
  if (bestMatch) {
    removeFromMatchMaking(bestMatch.driver);
    removeFromMatchMaking(bestMatch.passenger);
  }

  return bestMatch;
}

/*
  // Testing Objs

  const driver = new User(1, "John", "Doe", "555-1234", "321 South St", "456 Maple Ave", "sedan", true, thirtyMinutesFromNow, "driver" );
  const passenger1 = new User(2, "Jane", "Doe", "555-5678", "123 Main St", "456 Maple Ave", null, true, thirtyMinutesFromNow , "passenger" );
  const passenger2 = new User(3, "Bob", "Smith", "555-9012", "123 Main St", "456 Maple Ave", null, true, thirtyMinutesFromNow, "passenger" );
  const passengers = [passenger1, passenger2];

  const trip = new Trip(1, driver, passengers, "123 Main St", "456 Maple Ave", 20.00, "2023-04-09");
  console.log(trip.toJSON());*
*/
