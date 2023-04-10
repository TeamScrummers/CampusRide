<!-- home page -->
<!-- Preloading Mapbox Scripts -->
<svelte:head>
  <script type="module" src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></script>
  <script type="module" src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js"></script>
  <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
</svelte:head>

<script>
  import Map from '../map/map.svelte';
  import Locateuser from '../map/locateuser.svelte';
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte';
  // Accessing Stores
	import { writable } from 'svelte/store'
  import { destinationCoords, latestArrival, userCoords, appMode} from '../firebase/Store.js';
  import Geocoder from '../map/geocoder.svelte';

  
	function driverMode() {
		appMode.set("Driver")
    // I need an obj to pass, how can I get the obj? When user logs in they get info, we rip that info and store in a store. store obj? 
    // add user to matchmaking pool (call the function)
		goto('/matching')
	}

	function passengerMode() {
		appMode.set("Passenger")
    // add user to matchmaking pool (call the function)
		goto('/matching')
	}


  onMount(() => {
    const startTime = document.getElementById("startTime");
    startTime.addEventListener("input", () => {
      //valueSpan.innerText = startTime.value;
      latestArrival.set(startTime.value)
    }, false);
  })


</script>

<section>
  <div class = "map-overlay">
    <div class="location-overlay">
      <h4 style="color:#000000;text-align:center">Where are you going?</h4>
      <Geocoder></Geocoder>
    </div>

    <Locateuser></Locateuser>
    <div class = "time-overlay">
      <h4>When do you need to be there?</h4>
      <form style="text-align:center; padding:10px">
        <label for="startTime"></label>
        <input type="time" id="startTime" />
      </form>
    </div>

    <!-- Maybe do reverse geocoding to display user's address (or nearby address) -->
    <!-- Destination Coords: {$destinationCoords}
    <br>
    Time: {$latestArrival}
    <br>
    User Coords: {$userCoords}
    <br> -->
    <div class = "button-container">
      <button type="button" class="mode-button" on:click={() => passengerMode()}>Passenger Mode</button>
      <button type="button" class="mode-button" on:click={() => driverMode()}>Driver Mode</button>
    </div>
  </div>
</section>

<Map></Map>

<style>
  .map-overlay{
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
    }

  .location-overlay{
    position: relative;
  }

  .time-overlay{
    position: relative;
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
</style>