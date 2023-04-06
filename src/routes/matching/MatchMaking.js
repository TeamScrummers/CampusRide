  // Import match making pool
  // This should be a DB call later.
  import { get, writable } from "svelte/store";
  import { matchMakingPool } from "../firebase/crStore";

  const thirtyMinutesFromNow = new Date(Date.now() + 30 * 60000);

  // This adds an object to a Svelte Store using obj.update()
  function addObject(newObject) {
    matchMakingPool.update(arr => [...arr, newObject]);
  }
  /*
  user sets latestarrivaltime
  user is added tow aiting pool (the queue)
  if user time is within 30 min we add them to the active searching pool (matchmaking)
  Find a match and remove both parties from the pool
  once both sides confirm their trip it is scheudle and recorded in the db and we post them to routig page w/ geolocation data
  at any point a user shuld be able to cancel the ride so we must address the edge cases that occur 
  we must ahndle poor user input for the lateast arrival time 
  */


  // You are scheduled to enter match making later. 
  export function scheduledMatchMaking(user) {

  }

  export function addMatchMaking(user) {
    
  }

  export function removeMatchMaking(user) {
    
  }

  // checks status of all 
  export function refreshMatchMaking(user) {
    if (latestTimeOfArrival <= thirtyMinutesFromNow) {
      // in match making pool
    }
    else if (latestTimeOfArrival > thirtyMinutesFromNow) {
      // scheduled for match making
    }

    else {
      // error: latestTimeOfArrival is bad?
    }

  }

  // Function to add a driver to the match making pool if latestarrival is within 30 min
  export function addDriverToMatchMakingPool(driver, timeOfArrival) {
    const thirtyMinutesFromNow = new Date(Date.now() + 30 * 60000);
    if (timeOfArrival <= thirtyMinutesFromNow) {
      let newObject = {
        // uid
        type: "Driver",
        data: driver,
        timeOfArrival: timeOfArrival,
      }
      addObject(newObject)
    }
  }

  

  // Function to add a passenger to the match making pool
  export function addPassengerToMatchMakingPool(passenger, timeOfArrival) {
    const thirtyMinutesFromNow = new Date(Date.now() + 30 * 60000);
    if (timeOfArrival <= thirtyMinutesFromNow) {
      let newObject = {
        // uid
        type: "Passenger",
        data: passenger,
        timeOfArrival: timeOfArrival,
      }
      addObject(newObject)
    }
  }
/*
  // Testing
  // const driver = new Driver("John Doe", "+1-555-123-4567", "SUV", true);
	// const passenger = new Passenger("Jane Smith", "+1-555-987-6543", "789 Broad St, Anytown, USA", "123 Elm St, Anytown, USA");

  const driver1 = { name: "John", vehicleType: "SUV" };
  const passenger1 = { name: "Jane", pickupLocation: "123 Main St", destination: "456 Elm St" };

  addDriverToMatchMakingPool(driver1, new Date(Date.now() + 20 * 60000)); // 20 min
  addPassengerToMatchMakingPool(passenger1, new Date(Date.now() + 25 * 60000)); // 25 min

  console.log(matchMakingPool);
*/
