<script>
  import Map from '../map/map.svelte';
  import RouteMap from '../map/routeMap.svelte';
  import { User } from '../matching/User';
  import { getUserID } from '../firebase/Auth';
  import { readFromDatabaseOnValue } from '../firebase/Database';
  import { listenToANode } from '../firebase/Database';
  let availableFlag, tripFlag, fareFlag = true
  let start, endCoord, userID, localUser, tripOBJ

  async function fetchData() {
    userID = await getUserID();
    localUser = User.fromJSON(await readFromDatabaseOnValue(`users/${userID}/`));
    start = await localUser.startLocation
    //endCoord = *drivercoords*
    console.log(localUser)

    listenToANode(`users/${userID}/available`, availableListener)
    listenToANode(`users/${userID}/tempTripID`, tempTripIDListener)
  }
  
  function returnValue (value) {
    return value
  }

  async function availableListener(childSnapshot){
    availableFlag = childSnapshot
    console.log("AVAILABLE LISTENED: " + childSnapshot)
    console.log("fareFlag: " + fareFlag)
  }

  async function tempTripIDListener(childSnapshot){
    let tripID = childSnapshot
    tripOBJ = await readFromDatabaseOnValue(`trip/${tripID}`)
    console.log("TRIPID LISTENED: " + childSnapshot)
  }

  fetchData();
</script>

{#if localUser}
  {#if (localUser.mode === 'passenger') }
    {#if (fareFlag == true)}
      <h3>Total Trip Fare Will Be $6.</h3>
      <button type="button" class="mode-button" on:click={() => {fareFlag = false} }>Accept</button>
      <Map></Map>
    {/if}
    {#if (availableFlag == true && fareFlag == false) } 
      <h3>Looking For A Match...</h3>
      <Map></Map>
    {/if}
    {#if (availableFlag == false && fareFlag == false) } 
    <h3>Match Found: Pickup Enroute</h3>
    {$endCoord = tripOBJ.driver.startLocation}
    <RouteMap {start} {endCoord}></RouteMap>
    
    {/if}
    <p>Default</p>



  {:else if (localUser.mode === 'driver')}
    <p>Routing driver to passenger</p>
    <RouteMap></RouteMap>
  {:else}
    <h4>ERROR: Invalid App Mode</h4>
  {/if}
{:else}
  <h3>Loading User Data...</h3>
{/if}
