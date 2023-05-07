import { updateFromDatabase } from '../firebase/Database.js';
import { getUserID } from '../firebase/Auth.js';


/**
*  Attempts to locate the user using the Geolocation API.
*  If Geolocation is not supported by the browser, logs an error message to the console.
*  If supported calls geolocateSuccess(position)
*  @returns {void}
**/
export function locateUser() {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser")
  } else {
    navigator.geolocation.getCurrentPosition(geolocateSuccess, geolocateError);
  }
}


/**
* Async function to pull user's coords then write them to database.
* @param {Object} position - The position object returned by the geolocation request
* @returns {String} - Coords in string format, "98.2,-37.52"
*/
async function geolocateSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coords = longitude.toString()+','+latitude.toString()
  const userID = await getUserID();

  // Updating DB
  updateFromDatabase(`users/${userID}`, {startLocation: coords});
  return coords

  // Debug
  //console.log("UID: " + userID + ' Starting Coords: ' + coords)
}

function geolocateError() {
  console.log("ERROR: Geolocation error in /src/routes/map/locateuser.svelte")
}