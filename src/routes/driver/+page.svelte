<!-- Preloading Mapbox Scripts -->
<svelte:head>
  <script type="module" src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></script>
  <script type="module" src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js"></script>
  <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
</svelte:head>

<script>
  import Map from '../map/map.svelte';
  import { locateUser } from '../map/locateuser';
  import { goto } from '$app/navigation'
  import { latestArrival } from '../firebase/Store.js';
  import Geocoder from '../map/geocoder.svelte';
  import { readFromDatabaseOnValue, updateFromDatabase } from '../firebase/Database';
  import { getUserID } from '../firebase/Auth.js';
  import { timeStringToDate } from '../passenger/timeStringToDate';
  import { updateMatchMaking } from '../matching/MatchMaking';
  import { User } from '../matching/User';

  let timeInput = ''
  let vehicleType = ''
  function handleTimeInput(event) {
    timeInput = event.target.value;
  }

  async function submitDriver() {
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
    updateFromDatabase(`users/${userID}`, {mode: "driver"})
    // Write endLocation
    var localUser = new User()
    localUser = localUser.fromJSON(await readFromDatabaseOnValue(`users/${userID}/`))

    // Writes user to matchmaking pool
    //updateMatchMaking(localUser)

    goto('/accept')
  }

</script>

<section>
  <div class = "map-overlay">
    <div class="location-overlay">
      <h4 style="color:#000000;text-align:center;font-weight: bold">Driver Mode</h4>
      <h4 style="color:#000000;text-align:center">Where are you going too ?</h4>
      <Geocoder></Geocoder>
    </div>

    <div class = "time-overlay">
      

      <h4>When do you need to be there?</h4>
      <form style="center; padding:10px">
        <input type="time" bind:value={timeInput} on:input={handleTimeInput} />
      </form>
    </div>
    <div class="vehicle-type-overlay">
        <h4>What type of vehicle do you have?</h4>
        <form style="text-align:center; padding:10px">
          <input type="text" bind:value={vehicleType} />
        </form>
    </div>
    <div class = "button-container">
      <button type="button" class="mode-button" on:click={() => submitDriver() }>Submit</button>
      <!-- <button type="button" class="mode-button" on:click={() => goto('/trippickup')}>
        Go to trip pickup
    </button> -->
    </div>

      
  </div>
</section>

<style>
  /* .map-overlay{
    color:#000000;
    text-align:center;
    background-color: lightgray;
    position: relative;
    margin-top: 10px;
    margin-left: 10px;
    padding: 10px;
    height: auto;
    width: fit-content;
    z-index: 1;
    } */

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
    width: 75%;
    font-size: 40px;
    font-style: italic;
    display: inline-block;
    font-size: 25px;
  }

  .button-container {
    text-align: center;
  }

  .mode-button:hover {
    opacity: 1;
  }
  .vehicle-type-overlay{
  position: relative;
  text-align: center;
  }

</style>
