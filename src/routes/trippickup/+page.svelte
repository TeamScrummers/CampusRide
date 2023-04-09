<!-- trip pick up -->
<script>
  import { get } from 'svelte/store'
  import { storedID, storedLocation } from '../firebase/Store.js'
  import { destinationCoords, latestArrival, userCoords} from '../firebase/Store.js'
  import DirectionsDriver from '../map/directionsDriver.svelte';
  var driverID = get(storedID)
  var driverLocation = get(storedLocation)
  
</script>

<section>
  <div class = "map-overlay">
    Destination Coords: {$destinationCoords}
    <br>
    <h1>On the way</h1>
  </div>
</section>
<DirectionsDriver></DirectionsDriver>

<style>
  .map-overlay{
      background-color: rgb(209, 209, 209);
        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        position:relative;
        top: 400px;
        height: 100px;
        width: 70%
  }
</style>