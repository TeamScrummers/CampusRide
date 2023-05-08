<script>
  import Map from '../map/map.svelte';
  import RouteMap from '../map/routeMap.svelte';
  import { User } from '../matching/User';
  import { getUserID } from '../firebase/Auth';
  import { readFromDatabaseOnValue } from '../firebase/Database';
  import { listenToANode } from '../firebase/Database';
  import { calculateFare, checkIfArrived, getAddress } from '../map/routeCalculation';
  import { goto } from '$app/navigation';
  import { locateUser } from '../map/locateuser';
  import {sendTheUserAPushNotifcation} from '../firebase/PushNotifications'
  import { checkout } from '../payment/payment'
  import { writable } from 'svelte/store';
  import { fareStore } from '../firebase/Store';
  
  let availableFlag, tripFlag, fareFlag = true
  let arrivedFlag
  let start, endCoord, userID, localUser, tripOBJ, fare

  async function fetchData() {
    arrivedFlag = false
    userID = await getUserID()
    localUser = User.fromJSON(await readFromDatabaseOnValue(`users/${userID}/`))
    start = await localUser.startLocation
    fare = await calculateFare(start, localUser.endLocation)
    console.log(localUser)

    listenToANode(`users/${userID}/available`, availableListener)
    listenToANode(`users/${userID}/tempTripID`, tempTripIDListener)
  }

  async function availableListener(childSnapshot) {
    availableFlag = childSnapshot
    console.log("AVAILABLE LISTENED: " + childSnapshot)
    console.log("fareFlag: " + fareFlag)
  }

  async function tempTripIDListener(childSnapshot){
    let tripID = childSnapshot
    tripOBJ = await readFromDatabaseOnValue(`trips/${childSnapshot}`)
    console.log("TRIPID LISTENED: " + childSnapshot)
    console.log(await tripOBJ)
    if (localUser.mode == 'passenger') {
      endCoord = tripOBJ.driver.startLocation
    }
    if (localUser.mode == 'driver') {
      endCoord = tripOBJ.passenger.startLocation
    }
  }

  fetchData();

  const tripPickUpInterval = setInterval(async function() {
    locateUser()
    start = await readFromDatabaseOnValue(`users/${userID}/startLocation`)
    endCoord = await tripOBJ.passenger.startLocation
    if (await checkIfArrived(start, endCoord) && arrivedFlag == false) {
      // alert("Driver Arrived!")
      arrivedFlag = true
      // goto('/tripenroute')
      clearInterval(tripPickUpInterval)
    }
  }, 5000); // Executes checkIfArrived every 5 seconds (5000ms)

  function acceptFare () {
    fareStore.set(fare)
    checkout()
  }
  
</script>

{#await fetchData()}
<p>Loading app mode...</p>
{:then}
{#if localUser}
  {#if (localUser.mode === 'passenger') }
    {#if (fareFlag == true)}
      <h3>Total Trip Fare Will Be ${(fare).toFixed(2)}.</h3>
      <button type="button" class="mode-button" on:click={() => {fareFlag = false} }>Accept</button>
      <Map></Map>
    {/if}
    {#if (availableFlag == true && fareFlag == false && arrivedFlag == false) } 
      <h3>Looking For A Match...</h3>
      <Map></Map>
    {/if}
    {#if (availableFlag == false && fareFlag == false && arrivedFlag == false) } 
      <h3>Match Found: Pickup Enroute</h3>
      {sendTheUserAPushNotifcation('Match found!', 'A driver has been found and is enroute!')}
      <RouteMap {start} {endCoord}></RouteMap>
    {/if}
    {#if (availableFlag == false && fareFlag == false && arrivedFlag == true) } 
      <h3>Your ride is outside!</h3>
      <button type="button" class="mode-button" on:click={() => {acceptFare()} }>Submit Payment</button>
      <RouteMap {start} {endCoord}></RouteMap>
    {/if}
    
  {:else if (localUser.mode === 'driver')}
    {#if (arrivedFlag == false) }
      {#if tripOBJ}
        <p>Routing you to {tripOBJ.passenger.firstName} {tripOBJ.passenger.lastName}'s pick up location.</p>
        <!-- <p>{getAddress(tripOBJ.passenger.startLocation)}</p> -->
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
