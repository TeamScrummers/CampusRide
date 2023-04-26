<script>
  import Map from '../map/map.svelte';
  import RouteMap from '../map/routeMap.svelte';
  import { User } from '../matching/User';
  import { getUserID } from '../firebase/Auth';
  import { readFromDatabaseOnValue } from '../firebase/Database';
  import { listenToANode } from '../firebase/Database';
  import { checkIfArrived } from '../map/routeCalculation';
  import { goto } from '$app/navigation';
  import { locateUser } from '../map/locateuser';

  let dataFlag = false
  let arrivedFlag = false
  let start, endCoord, userID, localUser, tripOBJ

  async function fetchData() {
    userID = await getUserID()
    localUser = User.fromJSON(await readFromDatabaseOnValue(`users/${userID}/`))
    tripOBJ = await readFromDatabaseOnValue(`trips/${localUser.tempTripID}/`)
    console.log("tripenroute tripobj:")
    console.log(await tripOBJ)
    start = await localUser.startLocation
    endCoord = await localUser.endLocation
    console.log("start")
    console.log(await start)
    console.log("endcoord")
    console.log(await endCoord)
    dataFlag = true
  }

  fetchData();
  const tripEnrouteInterval = setInterval(async function() {
    locateUser()
    start = await readFromDatabaseOnValue(`users/${userID}/startLocation`)
    if (await checkIfArrived(await start, await endCoord) && arrivedFlag == false) {
      // alert("Driver Arrived!")
      dataFlag = true
      arrivedFlag = true
      // goto('/tripenroute')
      clearInterval(tripEnrouteInterval)
    }
  }, 5000); // Executes checkIfArrived every 5 seconds (5000ms)
</script>

{#if localUser}
  {#if (arrivedFlag == false) } 
    <h3>Trip Enroute: To Destination</h3>
    <RouteMap {start} {endCoord}></RouteMap>
  {/if}
  {#if (arrivedFlag == true) } 
    <h3>You've Arrived!</h3>
    <button type="button" class="mode-button" on:click={() => {goto('/payment')} }>Continue</button>
    <RouteMap {start} {endCoord}></RouteMap>
  {/if}
{/if}
Test
