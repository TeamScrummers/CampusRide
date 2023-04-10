import { get, writable } from "svelte/store";
import { matchMakingPool, waitingPool } from "../firebase/Store";
import { deleteDataFromDatabase, loopThroughDatabase, pushAnObjectToDatabase, searchFromDatabase } from "../firebase/Database";

const thirtyMinutesFromNow = new Date(Date.now() + 30 * 60000);

/**
 * @brief Adds object Svelte store array matchMakingPool[] using obj.update().
 * @param {object} newObject - The object to added to matchMakingPool[].
*/
function addMatchMakingObject(newObject) {
  // let tempDate = newObject.latestArrival
  // newObject.latestArrival = dateToISO(newObject.latestArrival)
  // pushAnObjectToDatabase(`matchMakingPool/`, newObject)
  // newObject.latestArrival = tempDate
  matchMakingPool.update(arr => [...arr, newObject]);
}

/**
 * @brief Adds object Svelte store array waitingPool[] using obj.update().
 * @param {object} newObject - The object to added to waitingPool[].
*/
function addWaitingObject(newObject) {
  // let tempDate = newObject.latestArrival
  // newObject.latestArrival = dateToISO(newObject.latestArrival)
  // pushAnObjectToDatabase(`waitingPool/`, newObject)
  // newObject.latestArrival = tempDate
  waitingPool.update(arr => [...arr, newObject]);
}

/**
 * @brief Parses a date obj and returns a Date object
 * @param {object} obj - Object to parse, usually string in ISO format
 * @return {Date} A Date object
 */
export function stringToDate(obj) {
  return new Date(Date.parse(obj));
}

/**
 * @brief Converts a date object to its ISO string equal
 * @param {Date} date - The date object to be converted
 * @returns {string} The ISO string representation of the date
 */
export function dateToISO(date) {
  return date.toISOString();
}


/**
 * @brief Remove a user from the match making pool.
 * @param {object} user - The user to remove from the match making pool.
*/
export function removeFromMatchMaking(user) {

  // function deleteMatchedObject(childSnapshot) {
  //   console.log('Comparing:', childSnapshot.val().phoneNumber, user.phoneNumber);
  //   if (childSnapshot.val().phoneNumber == user.phoneNumber) {
  //     console.log('Deleting:', childSnapshot.val());
  //     deleteDataFromDatabase(`matchMakingPool/`, childSnapshot.key);
  //   }
  //   else {
  //     console.log("deleteMatchedObject Else Trigger");
  //   }
  // }
  // loopThroughDatabase(`matchMakingPool/`, deleteMatchedObject);

  const index = get(matchMakingPool).findIndex((obj) => obj === user);
  if (index !== -1) {
    matchMakingPool.update(arr => {
      arr.splice(index, 1);
      return arr;
    });
  }
}

/**
 * @brief Refreshes user's position in match making queue. 
*/
export function refreshMatchMakingPool() {
  setInterval(() => {
    // Replace this code with the logic to refresh the matchMakingPool array
    console.log('Matchmaking pool refreshed.');
  }, 60000); // 60000 milliseconds = 1 minute
}

/**
 * @brief Updates the user's status in match making queue. 
 * @param {object} user - The user to update the status of.
*/
export function updateMatchMaking(user) {
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

/**
 * @brief Parses through userPool & selects the best pair of driver/passengers.
 * @param {Array<object>} userPool - An array of user objects to search through for the best match.
 * @returns {Array<object>} - An array with the matched driver and passenger objects.
*/
export function matchMake(userPool) {
  // Filter users to only include drivers and passengers
  const drivers = get(userPool).filter(user => user.mode === 'driver');
  const passengers = get(userPool).filter(user => user.mode === 'passenger');

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
