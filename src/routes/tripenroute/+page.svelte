<script>
  import Map from '../map/map.svelte';
  import RouteMap from '../map/routeMap.svelte';
  import { User } from '../matching/User';
  import { getUserID } from '../firebase/Auth';
  import { readFromDatabaseOnValue } from '../firebase/Database';
  import { listenToANode } from '../firebase/Database';
  import { goto } from '$app/navigation';

  let availableFlag, tripFlag, fareFlag = true
  let arrivedFlag = false
  let start, endCoord, userID, localUser, tripOBJ

  async function fetchData() {
    userID = await getUserID()
    localUser = User.fromJSON(await readFromDatabaseOnValue(`users/${userID}/`))
    start = await localUser.startLocation
    end = await localUser.endLocation
  }

  fetchData();
  setInterval(function() {
    checkIfArrived(arrivedFlag)
  }, 10000); // Executes checkIfArrived every 10 seconds (10000ms)
</script>

{#if localUser}
  {#if (arrivedFlag == false) } 
    <h3>Trip Enroute: To Destination</h3>
    <RouteMap {start} {endCoord}></RouteMap>
  {/if}
  {#if (arrivedFlag == true) } 
    <h3>You've Arrived!</h3>
    <button type="button" class="mode-button" on:click={() => {goto('/tripComplete')} }>Continue</button>
    <RouteMap {start} {endCoord}></RouteMap>
  {/if}
{:else}
  <h3>Loading...</h3>
{/if}
