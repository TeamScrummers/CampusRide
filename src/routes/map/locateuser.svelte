<p id="status"></p>
<a id="map-link" target="_blank"></a>
<!-- User's Location: {$userCoords} -->

<script>
import { userCoords } from '../firebase/crStore.js';
import { onMount } from 'svelte';
//onMount(() => {})

onMount(() => {
function geoFindMe() {
    
    const status = document.querySelector("#status");
    const mapLink = document.querySelector("#map-link");
  
    mapLink.href = "";
    mapLink.textContent = "";
  
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = "";
    //   mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    //   mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    //   map box need you to pass lng then lat for methods  
    userCoords.set(longitude.toString()+','+latitude.toString())
      
    }
  
    function error() {
      status.textContent = "Unable to retrieve your location";
    }
  
    if (!navigator.geolocation) {
      status.textContent = "Geolocation is not supported by your browser";
    } else {
      status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  
  geoFindMe()
})
</script>