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
  import { destinationCoords, latestArrival, userCoords} from '../firebase/crStore.js';
  import Geocoder from '../map/geocoder.svelte';
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
      <h4 style="color:#000000;text-align:center;padding:7px">When do you need to be there?</h4>
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
    <button type="button" class="registerbtn" on:click={() => goto('/matching')}>Request Ride</button>
  </div>
</section>

<Map></Map>

<style>
      .map-overlay{
        background-color: rgb(209, 209, 209);
        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        position: absolute;
        top: -75px;
        bottom: -200px;
        left: -75px;
        width: 300px;
      }

      .time-overlay{
        background-color: white;
        border-radius:309;
        position: relative;
        top: 50px;
      }
      
      .location-overlay{
        background-color: hsl(0, 0%, 93%);
        border-radius:30%;
        position: relative;
        top: 50px;
      }
  
    .registerbtn {
        background-color: #04AA6D;
        color: white;
        padding: 16px 2px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 75%;
        opacity: 0.9;
        border-radius: 50%;
        position: absolute;
        top: 350px;
        left: 40px;
        height: 200px;
        font-size: 40px;
        font-style: italic;
    }

    .registerbtn:hover {
        opacity: 1;
    }
</style>