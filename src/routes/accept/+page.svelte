<script>
  import { getUserID } from "../firebase/Auth";
  import { searchFromDatabase, readFromDatabaseOnValue, findUserByPhone, updateFromDatabase} from "../firebase/Database";
  import { User } from "../matching/User";
  import RouteMap from "../map/routeMap.svelte";
  import { calculateFare, getAddress, getDriveDistance, getDriveTime } from "../map/routeCalculation";
  import { Trip } from "../firebase/Trip";
  import Slider from "./Slider.svelte";
  import { goto } from "$app/navigation";

  const userID = getUserID()
  let passengers = []
  let localUser
  let sortedFlag =  false
  let mapFlag = false
  let start, endCoord, timerId
  let sliderValue = 50

  // Function to sort passengers by drive time
  async function sortByDriveTime(passengers) {
    const passengersObj = await searchFromDatabase("users", "mode", "passenger");
    passengers = Object.keys(passengersObj).map(key => passengersObj[key])
    const passengersWithDriveTime = [];
    for (const passenger of passengers) {
      const driveTime = await getDriveTime(localUser.startLocation, passenger.startLocation) + await getDriveTime(passenger.startLocation, localUser.endLocation);
      const driveDistance = await getDriveDistance(localUser.startLocation, passenger.startLocation)
      if (driveDistance > sliderValue || passenger.available != true) {
        continue;
      }
      // console.log("Pushing: " + JSON.stringify(passenger))
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
    let tripID = await Trip.makeTrip(await readFromDatabaseOnValue(`users/${userID}/`),passenger)
    let passengerID = await findUserByPhone(passenger.phoneNumber)
    console.log("post find: " + tripID)
    updateFromDatabase(`users/${passengerID}`, { tempTripID: tripID });
    updateFromDatabase(`users/${passengerID}`, { available: false });
    updateFromDatabase(`users/${userID}`, { tempTripID: tripID });
    console.log("post update")
    goto('/trippickup')
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

  async function declinePassenger(passenger) {
    passengers = passengers.filter(p => p !== passenger)
    getMapRoute(localUser.startLocation, passengers[0].startLocation)
  }

  async function updateSlider (event) {
    console.log('Slider value changed:', event.detail);
    sliderValue = event.detail;
    passengers = await sortByDriveTime(passengers);
  }

  const handleSliderChange = async (event) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      updateSlider(event);
    }, 1000); // 1 second
  };

  let isDrawerOpen = true;
  async function toggleDrawer() {
    if (isDrawerOpen == true) {
      // passengers = await sortByDriveTime(passengers);
      isDrawerOpen = !isDrawerOpen;
    }
    else {
      isDrawerOpen = !isDrawerOpen;
    }
  }

  driverMode()
</script>

<!-- Slider Div -->
<div class="slider-container">
  <p><b>Range:</b></p>
  <Slider bind:value={sliderValue} on:valueChanged={handleSliderChange} />
</div>
{#if mapFlag === true}
  <RouteMap {start} {endCoord} key={new Date().getTime()}></RouteMap>
{/if}

<div class={`drawer ${isDrawerOpen ? "open" : ""}`}>
  <!-- Drawer content goes here -->
  
  {#if sortedFlag === true && passengers.length > 0}
    {#await getAddress(passengers[0].startLocation)}
      <p>Loading...</p>
    {:then address}
      {#await Promise.all([
          getDriveDistance(localUser.startLocation, passengers[0].startLocation),
          getDriveDistance(passengers[0].startLocation, localUser.endLocation),
          getDriveTime(localUser.startLocation, passengers[0].startLocation),
          getDriveTime(passengers[0].startLocation, localUser.endLocation),
          calculateFare(localUser.startLocation, passengers[0].startLocation),
          getMapRoute(localUser.startLocation, passengers[0].startLocation),
        ])}
        <h4>Loading, please wait.</h4>
      {:then [distance1, distance2, time1, time2, fare]}
        <div>
          <h4><strong>{passengers[0].firstName} {passengers[0].lastName}</strong></h4>
          <p><strong>Pickup Location:</strong> {address}</p>
          <p><strong>Estimated Trip Time:</strong> {(time1 + time2).toFixed(1)} minutes</p>
          <p><strong>Distance to Pickup:</strong> {(distance1).toFixed(1)} miles</p>
          <!-- <p><strong>Total Trip Distance:</strong> {(distance1 + distance2).toFixed(1)} miles</p> -->
          <p><strong>Trip Fare:</strong> ${(fare).toFixed(2)} </p> 
          <p><strong>Driver Payment:</strong> ${(fare-1).toFixed(2)} </p>
          <!-- <p><strong>Availability:</strong> {passengers[0].available} </p> -->
          
          <p>
            <button class="accept-button" on:click|stopPropagation={() => acceptPassenger(passengers[0])}>Accept</button>
            <button class="decline-button" on:click|stopPropagation={() => declinePassenger(passengers[0])}>Decline</button>
          </p>
        </div>
      {:catch error}
        <p>{error.message}</p>
      {/await}
    {:catch error}
      <p>{error.message}</p>
    {/await}
  {:else if sortedFlag === true && passengers.length === 0}
    <h4>No passengers available at this time, please try again later.</h4>
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
  .slider-container {
    background-color: white;
    position: absolute;
    top: 5px;
    left: 5px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: black;
    /* border: 2px solid black; */
    border-radius: 10px;
    padding: 4px;
    z-index: 1;
    box-shadow: 5px 0 10px rgba(0, 0, 0, 0.2);
  }

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
    overflow-y: scroll;

  }

  .drawer.open {
    height: 300px;
    padding: 10px;    
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
  .accept-button, .decline-button {
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
  .decline-button {
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