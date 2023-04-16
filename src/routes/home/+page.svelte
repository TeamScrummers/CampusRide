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

  let isDriverMode = false;

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

  let mode = 'passenger';

  function toggleMode() {
    if (mode === 'passenger') {
      mode = 'driver';
    } else {
      mode = 'passenger';
    }
  }

  let isDrawerOpen = false;
  
  function toggleDrawer() {
    isDrawerOpen = !isDrawerOpen;
  }
</script>

<!-- <Navbar data={ linkUtil } /> -->
<!--
  <section>
  <div class = "map-overlay">
    <div class="location-overlay">
      <h4 style="color:#000000;text-align:center">Driving or Riding?</h4>
    </div>
     Make the map auto locate the user for effect -->
   <!--<div class = "button-container">
      <button type="button" class="mode-button" on:click={() => passengerMode()}>Passenger Mode</button>
      <button type="button" class="mode-button" on:click={() => driverMode()}>Driver Mode</button>
    </div>
  </div>
</section>
-->


<div class="mode-switch-container">
  {#if mode === 'passenger'}
    <label class="mode-label" for="mode-switch-container">Passenger</label>
    <div class="iframe-container">
      <iframe id="iframe1" src="./passenger"></iframe>
    </div>
  {:else}
    <label class="mode-label" for="mode-switch-container" style="opacity: 0">Passenger</label>
  {/if}
  
  <label class="mode-switch">
    <input type="checkbox" id="mode-switch-input" on:change={toggleMode}>
    <span class="mode-slider round"></span>
  </label>
  
  {#if mode === 'driver'}
    <label class="mode-label" for="mode-switch-container">Driver</label>
    <div class="iframe-container">
      <iframe id="iframe1" src="./driver"></iframe>
    </div>
  {:else}
    <label class="mode-label" for="mode-switch-container" style="opacity: 0">Driver</label>
  {/if}
</div>

<div class={`drawer ${isDrawerOpen ? "open" : ""}`}>
  <div class="handle" on:click={toggleDrawer}>
    <svg class="icon" viewBox="0 0 24 24">
      <path d="M7,12L12,7L17,12H7Z" />
    </svg>
  </div>
  <iframe id="iframe2" src="./profile"></iframe>
</div>


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

  .mode-switch-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  font-size: 16px;
  color: #333;
  position: absolute;
  top: 10px;
  right: 10px;
}

.mode-label {
  text-transform: uppercase;
  letter-spacing: 1px;
}

.mode-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.mode-switch input[type="checkbox"] {
  display: none;
}

.mode-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}

.mode-slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

input[type="checkbox"]:checked + .mode-slider {
  background-color: #2196F3;
}

input[type="checkbox"]:checked + .mode-slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.round {
  border-radius: 34px;
}

.iframe-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#iframe1 {
  height: 70%;
  width: 70%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: transparent;
}

.drawer {
  position: fixed;
  top: 0;
  left: -30vh; /* Move the drawer off screen to the left */
  width: 30vh;
  height: 100%;
  background-color: white;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s ease-out; /* Use transform instead of height */
}

  .drawer.open {
    transform: translateX(30vh); /* Move the drawer back onto the screen */
  }

  .handle {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 4%;
    left: 1%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    box-shadow: 5px 0 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.3s ease-out, right 0.3s ease-out;
    z-index: 100;
}

.drawer.open .handle {
  right: 200px;
  transform: translate(-50%, -50%) rotate(0deg); /* adjust the transform property for open state */
}


.handle:hover {
  transform: translateX(10px) translateY(-50%);
}

.icon {
  width: 30px;
  height: 30px;
  fill: grey;
  transition: fill 0.3s ease-out;
  z-index: 100;
  transform: rotate(90deg);
}

.handle:hover .icon {
  fill: black;
}


.iframe2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.drawer iframe {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

</style>