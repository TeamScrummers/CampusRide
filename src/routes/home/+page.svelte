<!-- Preloading Mapbox Scripts -->
<svelte:head>
  <script type="module" src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></script>
  <script type="module" src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js"></script>
  <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
</svelte:head>

<script>
  import Map from '../map/map.svelte';
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte';
  // Accessing Stores
	import { writable } from 'svelte/store'
  import { destinationCoords, latestArrival, userCoords, appMode} from '../firebase/Store.js';
  import Geocoder from '../map/geocoder.svelte';
  import Navbar from "../navbar/navbar.svelte"
  import { linkUtil } from "../utils/linkUtils"

  
	function driverMode() {
		appMode.set("Driver")
    // add user to matchmaking pool (call the function)
		goto('/driver')
	}

	function passengerMode() {
		appMode.set("Passenger")
    // add user to matchmaking pool (call the function)
		goto('/passenger')
	}
</script>

<Navbar data={ linkUtil } />

<section>
  <div class = "map-overlay">
    <div class="location-overlay">
      <h4 style="color:#000000;text-align:center">Driving or Riding?</h4>
    </div>
    <!-- Make the map auto locate the user for effect -->
   <!--<div class = "button-container">
      <button type="button" class="mode-button" on:click={() => passengerMode()}>Passenger Mode</button>
      <button type="button" class="mode-button" on:click={() => driverMode()}>Driver Mode</button>
    </div> --> 
  </div>
</section>

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