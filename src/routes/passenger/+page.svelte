<script>
  import Map from '../map/map.svelte';
  import { locateUser } from '../map/locateuser';
  import { goto } from '$app/navigation'
  import { latestArrival } from '../firebase/Store.js';
  import Geocoder from '../map/geocoder.svelte';
  import { readFromDatabaseOnValue, updateFromDatabase } from '../firebase/Database';
  import { getUserID } from '../firebase/Auth.js';
  import { timeStringToDate } from './timeStringToDate';
  import { updateMatchMaking } from '../matching/MatchMaking';
  import { User } from '../matching/User';
  import {sendTheUserAPushNotifcation, sendDriverArrivedNotifcation, sendPassengerAvailableNotifcation, sendDriverAcceptedNotifcation} from "../firebase/PushNotifications"


  let timeInput = '';
  function handleTimeInput(event) {
    timeInput = event.target.value;
  }

  async function submitPassenger() {
    // hh:mm to date obj
    let timeOutput = timeStringToDate(timeInput)

    // Updating Svelte Store
    latestArrival.set(timeOutput)

    // Updating DB
    const userID = getUserID()
    // locateUser() updates startLocation
    locateUser()
    updateFromDatabase(`users/${userID}`, {available: true})
    // <Geocoder></Geocoder> updates endLocation
    updateFromDatabase(`users/${userID}`, {latestArrival: timeOutput.toISOString()})
    updateFromDatabase(`users/${userID}`, {mode: "passenger"})
    // Write endLocation
    var localUser = User.fromJSON(await readFromDatabaseOnValue(`users/${userID}/`))

    // Makes a DB Field for later manipulation
    updateFromDatabase(`users/${userID}`, { tempTripID: "" });


    goto('/trippickup')
  }

  //locateUser()
</script>

<section>
  <div class = "map-overlay">
    <div class="location-overlay">
      <h4 style="color:#000000;text-align:center;font-weight: bold">Passenger Mode</h4>
      <h4 style="color:#000000;text-align:center">Where are you going?</h4>
      <div style="display: flex; justify-content: center; align-items: center;">
        <Geocoder></Geocoder>
      </div>
    </div>

    <div class = "time-overlay">
      

      <h4 style="color:#000000;text-align:center">When do you need to be there?</h4>
      <form style="text-align:center; padding:10px">
        <input type="time" bind:value={timeInput} on:input={handleTimeInput} />
      </form>
    </div>
    <div class = "button-container">
      <button type="button" class="mode-button" on:click={() => submitPassenger() }>Submit</button>
    </div>
  </div>
</section>

<style>
  .location-overlay{
    position: relative;
  }

  .time-overlay{
    position: relative;
    text-align: center;
  }
    
  .mode-button {
    position: relative;
    background-color: #04AA6D;
    color: white;
    margin: 10px 10;
    cursor: pointer;
    opacity: .7;
    height: 50px;
    width: 25%;
    font-size: 40px;
    font-style: italic;
    display: inline-block;
    font-size: 25px;
  }

  .button-container {
    text-align: center;
    text-align: center;
  }

  .mode-button:hover {
    opacity: 1;
    text-align: center;
  }
</style>