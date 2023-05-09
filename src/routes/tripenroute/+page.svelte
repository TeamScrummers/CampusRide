<script>
  import RouteMap from '../map/routeMap.svelte';
  import { getUserID } from '../firebase/Auth';
  import { readFromDatabaseOnValue } from '../firebase/Database';
  import { checkIfArrived } from '../map/routeCalculation';
  import { goto } from '$app/navigation';
  import { locateUser } from '../map/locateuser';
  import { checkout } from '../payment/payment';

  let dataFlag = false
  let arrivedFlag = false
  let start, endCoord, userID, localUser, tripOBJ

  // Fetchs data from DB
  async function fetchData() {
    userID = await getUserID()
    localUser = await readFromDatabaseOnValue(`users/${userID}/`)
    tripOBJ = await readFromDatabaseOnValue(`trips/${localUser.tempTripID}/`)
    start = await localUser.startLocation
    endCoord = await localUser.endLocation
    dataFlag = true
  }

  fetchData();

  /**
   * Anonymous function that calls the `locateUser` and `checkIfArrived` functions every 5 seconds until the user has arrived.
   * @returns {void}
   */
  const tripEnrouteInterval = setInterval(async function() {
    locateUser()
    start = await readFromDatabaseOnValue(`users/${userID}/startLocation`)
    if (await checkIfArrived(await start, await endCoord) && arrivedFlag == false) {
      dataFlag = true
      arrivedFlag = true
      clearInterval(tripEnrouteInterval)
    }
  }, 5000); // Executes checkIfArrived every 5 seconds (5000ms)
</script>

<!-- If user data has been fetched start drawing maps. -->
{#if localUser}
  {#if (arrivedFlag == false) } 
    <h3>Trip Enroute: To Destination</h3>
    <RouteMap {start} {endCoord}></RouteMap>
  {/if}
  {#if (arrivedFlag == true) } 
    {#if (localUser.mode == 'passenger') }
      <h3>You've Arrived!</h3>
      <button type="button" class="mode-button" on:click={() => {checkout()} }>Payment</button>
      <RouteMap {start} {endCoord}></RouteMap>
    {/if }
    {#if (localUser.mode == 'driver') } 
      <h3>You've arrived!</h3>
      <button type="button" class="mode-button" on:click={() => {goto('/login')} }>Reset App</button>
      <RouteMap {start} {endCoord}></RouteMap>
    {/if}
  {/if}
{/if}

<style>
  h3 {
    font-size: 24px;
    margin-bottom: 16px;
  }

  .route-map {
    height: 400px;
    margin-bottom: 24px;
  }

  .mode-button {
    display: block;
    margin: 0 auto;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .mode-button:hover {
    background-color: #3e8e41;
  }
</style>
