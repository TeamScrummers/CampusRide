import { userCoords } from '../firebase/Store.js'
import { updateFromDatabase } from '../firebase/Database.js';
import { getUserID } from '../firebase/Auth.js';

export function locateUser() {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser")
  } else {
    navigator.geolocation.getCurrentPosition(geolocateSuccess, geolocateError);
  }
}

// Needs @brief, @param, @return comments
async function geolocateSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coords = longitude.toString()+','+latitude.toString()
  const userID = await getUserID();

  // Updating svelte store
  userCoords.set(coords)

  // Updating DB
  updateFromDatabase(`users/${userID}`, {startLocation: coords});

  // Debug
  //console.log("UID: " + userID + ' Starting Coords: ' + coords)
}

function geolocateError() {
  console.log("Geolocation error in /src/routes/map/locateuser.svelte")
}