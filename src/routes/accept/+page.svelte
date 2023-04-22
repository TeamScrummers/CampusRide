<script>
  import { getUserID } from "../firebase/Auth";
  import { searchFromDatabase, readFromDatabaseOnValue, writeTripToDatabase, findUserByPhone, updateFromDatabase} from "../firebase/Database";
  import { User } from "../matching/User";
  import Map from '../map/map.svelte';
  import RouteMap from "../map/routeMap.svelte";
  import { getAddress, getDriveDistance, getDriveTime } from "../map/routeCalculation";
  import { Trip } from "../firebase/Trip";
  const userID = getUserID()
  export let passengers = []
  export let localUser = new User()
  let sortedFlag =  false
  let mapFlag = true
  let start
  let endCoord

  // Function to sort passengers by drive time
  async function sortByDriveTime(passengers) {
    const passengersWithDriveTime = [];
    for (const passenger of passengers) {
      const driveTime = await getDriveTime(localUser.startLocation, passenger.startLocation) + await getDriveDistance(passenger.startLocation, localUser.endLocation);
      passengersWithDriveTime.push({
        ...passenger,
        driveTime
      });
    }
    passengersWithDriveTime.sort((a, b) => a.driveTime - b.driveTime);
    return passengersWithDriveTime;
  }

  async function driverMode() {
    localUser = User.fromJSON(await readFromDatabaseOnValue(`users/${userID}/`))
    const passengersObj = await searchFromDatabase("users", "mode", "passenger");
    const passengersArray = Object.keys(passengersObj).map(key => passengersObj[key])
    // Sorts passengers by distance from driver. 
    passengers = await sortByDriveTime(passengersArray)

    console.log(passengers);
    sortedFlag = true
  }
  
  async function acceptPassenger (passenger) {
    console.log("Accepted: " + passenger.firstName + " " + passenger.lastName)
    let tripID = await Trip.makeTrip(User.fromJSON(await readFromDatabaseOnValue(`users/${userID}/`)),User.fromJSON(passenger))
    let passengerID = await findUserByPhone(passenger.phoneNumber)
    console.log("post find: " + tripID)
    updateFromDatabase(`users/${passengerID}`, { tempTripID: tripID });
    updateFromDatabase(`users/${passengerID}`, { available: false });
    updateFromDatabase(`users/${userID}`, { tempTripID: tripID });
    console.log("post update")
  }

  async function getMapRoute(startCoordinates, endCoordinates) {
    start = startCoordinates;
    endCoord = endCoordinates;
    console.log("getMapRoute Start:"+ start + " End:" + endCoord);
    // Update RouteMap with new coordinates
    start = startCoordinates
    endCoord = endCoordinates
    mapFlag = false
    setTimeout(() => {
      mapFlag = true
    }, 10) // adjust timeout if map does not refresh
  }


  let isDrawerOpen = false;
  function toggleDrawer() {
    isDrawerOpen = !isDrawerOpen;
  }

  driverMode()
</script>

{#if mapFlag === true}
  <RouteMap {start} {endCoord} key={new Date().getTime()}></RouteMap>
{/if}

<div class={`drawer ${isDrawerOpen ? "open" : ""}`}>
  <!-- Drawer content goes here -->
  {#if sortedFlag === true}
    {#each passengers as passenger}
      {#await getAddress(passenger.startLocation)}
        <p>Loading...</p>
      {:then address}
        {#await Promise.all([
            getDriveDistance(localUser.startLocation, passenger.startLocation),
            getDriveDistance(passenger.startLocation, localUser.endLocation),
            getDriveTime(localUser.startLocation, passenger.startLocation),
            getDriveTime(passenger.startLocation, localUser.endLocation)
          ])}
          <p>Loading...</p>
        {:then [distance1, distance2, time1, time2]}
          <div>
            <button class="passenger-info" on:click={() => {
                console.log(passenger.firstName + " " + passenger.lastName + " Button Pressed " + passenger.startLocation)
                getMapRoute(localUser.startLocation, passenger.startLocation)
              }}> 
              <h6><strong>{passenger.firstName} {passenger.lastName}</strong></h6>
              <p><strong>Pickup Location:</strong> {address}</p>
              <p><strong>Estimated Trip Time:</strong> {(time1 + time2).toFixed(1)} minutes</p>
              <p><strong>Total Trip Distance:</strong> {(distance1 + distance2).toFixed(1)} miles</p>
              <p><strong>Trip Fare:</strong> 6 Dollars</p> 
              <p><button class="accept-button" on:click|stopPropagation={() => acceptPassenger(passenger)}>Accept</button>
            </button>
          </div>
        {:catch error}
          <p>{error.message}</p>
        {/await}
      {:catch error}
        <p>{error.message}</p>
      {/await}
    {/each}
  {:else}
    <h4>Loading, please wait.</h4>
  {/if}
  

  <div class="handle" on:click={toggleDrawer}>
    <svg class="icon" viewBox="0 0 24 24">
      <path d="M7,12L12,7L17,12H7Z" />
    </svg>
  </div>
</div>

<style>
  .passenger-info {
    width: 100%;
    height: auto;
    text-align: left;
  }

  .drawer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    transition: height 0.3s ease-out;
    overflow-y: scroll
  }

  .drawer.open {
    height: 250px;
  }

  .handle {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.3s ease-out;
  }

  .handle:hover {
    transform: translateX(-50%) translateY(-10px);
  }

  .icon {
    width: 30px;
    height: 30px;
    fill: grey;
    transition: fill 0.3s ease-out;
  }

  .handle:hover .icon {
    fill: black;
  }
  /* button style layout */
  .buttons {
    display: flex;
    justify-content: space-between;
  margin-top: 16px;
  }
  .accept-button, .deny-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  }
  .accept-button {
  background-color: #00c853;
  color: white;
  }
  .deny-button {
  background-color: #f44336;
  color: white;
  }
  /* content box style layout */
  .content-box {
    padding: 16px;
    height: 100%;
    overflow-y: scroll;
  }
  .content-box h2 {
    margin-top: 0;
  }
</style>