<!-- trip pick up -->
<script>
  import { get } from 'svelte/store'
  import { storedID, storedLocation } from '../firebase/crStore.js';
  import { destinationCoords, latestArrival, userCoords} from '../firebase/crStore.js';
  import DirectionsDriver from '../map/directionsDriver.svelte';
  var driverID = get(storedID)
  var driverLocation = get(storedLocation)
  
</script>

<!-- <section>
  <div class = "map-overlay">
    Destination Coords: {$destinationCoords}
    <br>
    Time: {$latestArrival}
    <br>
    User Coords: {$userCoords}
  </div>
</section> -->
<DirectionsDriver></DirectionsDriver>
