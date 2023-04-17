<!-- trip pick up -->
<script>
  import { get } from 'svelte/store'
  import { storedID, storedLocation } from '../firebase/Store.js'
  import { destinationCoords, latestArrival, userCoords} from '../firebase/Store.js'
  import DirectionsDriver from '../map/directionsDriver.svelte';
  import Directions from '../map/directions.svelte';
  var driverID = get(storedID)
  var driverLocation = get(storedLocation)
  
  import Map from '../map/map.svelte';
  import RouteMap from '../map/routeMap.svelte';
</script>


// let start = [-96.3442924,30.5833155]
// let endCoord = [-96.469596,30.642855];
<RouteMap></RouteMap>
<!-- <Map></Map> -->
<!-- <DirectionsDriver></DirectionsDriver> -->

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
</style>