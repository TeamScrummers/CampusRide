<script>
  import Map from '../map/map.svelte';
  import RouteMap from '../map/routeMap.svelte';
  import { getUserID } from '../firebase/Auth';
  import { createANodeInDatabase, readFromDatabaseOnValue } from '../firebase/Database';
  import { listenToANode } from '../firebase/Database';
  import { calculateFare, checkIfArrived } from '../map/routeCalculation';
  import { goto } from '$app/navigation';
  import { locateUser } from '../map/locateuser';
  import {sendTheUserAPushNotifcation} from '../firebase/PushNotifications'
  
  let availableFlag, fareFlag = true
  let arrivedFlag
  let start, endCoord, userID, localUser, tripOBJ, fare

  // Fetch data from DB & start listeners to look for changes in DB values.
  async function fetchData() {
    arrivedFlag = false
    userID = getUserID()

    localUser = await readFromDatabaseOnValue(`users/${userID}/`)
    start = await localUser.startLocation
    fare = await calculateFare(start, localUser.endLocation)

    listenToANode(`users/${userID}/available`, availableListener)
    listenToANode(`users/${userID}/tempTripID`, tempTripIDListener)
  }


  async function availableListener(childSnapshot) {
    availableFlag = childSnapshot
    //Notification if available flag changes.
    sendTheUserAPushNotifcation('Match found!', 'Enroute to destination now!')
  }

  async function tempTripIDListener(childSnapshot){
    tripOBJ = await readFromDatabaseOnValue(`trips/${childSnapshot}`)
    if (localUser.mode == 'passenger') {
      endCoord = tripOBJ.driver.startLocation
    }
    if (localUser.mode == 'driver') {
      endCoord = tripOBJ.passenger.startLocation
    }
  }

  fetchData();

  
  /**
   * Anonymous function that calls the `locateUser` and `checkIfArrived` functions every 5 seconds until the user has arrived.
   * @returns {void}
   */
  const tripPickUpInterval = setInterval(async function() {
    locateUser()
    start = await readFromDatabaseOnValue(`users/${userID}/startLocation`)
    endCoord = await tripOBJ.passenger.startLocation
    if (checkIfArrived(start, endCoord) && arrivedFlag == false) {
      arrivedFlag = true
      sendTheUserAPushNotifcation('Arrived!', 'Driver is at pick up location!')
      clearInterval(tripPickUpInterval)
      
    }
  }, 5000); // Executes checkIfArrived every 5 seconds (5000ms)

  // Handles storing fare price in DB & eventually will trigger stripe passenger payment. 
  async function acceptFare () {
    fareFlag = false
    createANodeInDatabase(`users/${userID}/tempFare/`, fare)
    // Best logical time to request payment, but app will crash after payment is completed. 
    // checkout()
  }
  
</script>

{#await fetchData()}
<p>Loading app mode...</p>
{:then}
{#if localUser}
  {#if (localUser.mode === 'passenger') }
    {#if (fareFlag == true)}
      <h3>Total Trip Fare Will Be ${(fare).toFixed(2)}.</h3>
      <button type="button" class="mode-button" on:click={() => {acceptFare()} }>Accept</button>
      <Map></Map>
    {/if}
    {#if (availableFlag == true && fareFlag == false && arrivedFlag == false) } 
      <h3>Looking For A Match...</h3>
      <Map></Map>
    {/if}
    {#if (availableFlag == false && fareFlag == false && arrivedFlag == false) } 
      <h3>Match Found: Pickup Enroute</h3>
      <RouteMap {start} {endCoord}></RouteMap>
    {/if}
    {#if (availableFlag == false && fareFlag == false && arrivedFlag == true) } 
      <h3>Your ride is outside!</h3>
      <button type="button" class="mode-button" on:click={() => {goto('/tripenroute')} }>Continue</button>
      <RouteMap {start} {endCoord}></RouteMap>
    {/if}
    
  {:else if (localUser.mode === 'driver')}
    {#if (arrivedFlag == false) }
      {#if tripOBJ}
        <p>Routing you to {tripOBJ.passenger.firstName} {tripOBJ.passenger.lastName}'s pick up location.</p>
        <RouteMap {start} {endCoord}></RouteMap>
      {/if}
    {/if}
    {#if (arrivedFlag == true) } 
      <h3>You've arrived at the pickup location!</h3>
      <button type="button" class="mode-button" on:click={() => {goto('/tripenroute')} }>Continue</button>
      <RouteMap {start} {endCoord}></RouteMap>
    {/if}
  {:else}
    <h4>ERROR: Invalid App Mode</h4>
  {/if}
{:else}
  <h3>Loading User Data...</h3>
{/if}
{:catch error}
  <p>Error: {error.message}</p>
{/await}

<style>
  h3 {
    color: #333;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
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

  .map-container {
    height: 400px;
    margin-bottom: 20px;
  }

  p {
    text-align: center;
    font-size: 16px;
    color: #777;
  }
</style>
