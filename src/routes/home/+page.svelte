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
    <h4>Where are you going?</h4>
    <Geocoder></Geocoder>
    <h4>When do you need to be there?</h4>
    <Locateuser></Locateuser>
    <form>
      <label for="startTime"></label>
      <input type="time" id="startTime" />
    </form>
    <!-- Maybe do reverse geocoding to display user's address (or nearby address) -->
    <!-- Destination Coords: {$destinationCoords}
    <br>
    Time: {$latestArrival}
    <br>
    User Coords: {$userCoords}
    <br> -->
    <button type="button" on:click={() => goto('/matching')}>Submit</button>
  </div>
</section>

<Map></Map>

