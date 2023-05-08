<script>
  import { getUserID } from "../firebase/Auth";
  import { searchFromDatabase, readFromDatabaseOnValue, findUserByPhone, updateFromDatabase} from "../firebase/Database";
  import { User } from "../matching/User";
  import RouteMap from "../map/routeMap.svelte";
  import { calculateFare, getAddress, getDriveDistance, getDriveTime } from "../map/routeCalculation";
  import { Trip } from "../firebase/Trip";
  import { goto } from "$app/navigation";

  let userID = getUserID
  let localUser
  let passenger
  let driver
  let rating = 0;
  let feedback = '';
  let tripOBJ
  const name = 'John Smith';
  const distance = '10 miles';
  const price = '$20.00';
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Delete this after demo
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

  async function fetchData() {
    userID = await getUserID()
    localUser = await readFromDatabaseOnValue(`users/${userID}/`)
    tripOBJ = await readFromDatabaseOnValue(`trips/${localUser.tempTripID}/`)
  }

  const handleStarClick = (value) => {
    rating = value;
  };

  const handleFeedbackChange = (event) => {
    feedback = event.target.value;
  };

  const handleSubmit = () => {
    // submit rating and feedback data to backend API
    goto('/home')
  };
</script>

<section class="content">
  <div class="container">
    <h1> Receipt Trip Details </h1>
    <a href="/">Back </a>
  </div>
</section>

{#await Promise.all([
  getDriveDistance(tripOBJ.driver.startLocation, tripOBJ.passenger.startLocation),
  getDriveDistance(tripOBJ.passenger.startLocation, tripOBJ.driver.endLocation),
  getDriveTime(tripOBJ.driver.startLocation, tripOBJ.passenger.startLocation),
  getDriveTime(tripOBJ.passenger.startLocation, tripOBJ.driver.endLocation),
  calculateFare(tripOBJ.driver.startLocation, tripOBJ.passenger.startLocation),
  getMapRoute(tripOBJ.driver.startLocation, tripOBJ.passenger.startLocation)
])}
<h4>Loading, please wait.</h4>
{:then [distance1, distance2, time1, time2, fare]}
  <div class="receipt">
    <h2>Thank you for riding with us! </h2>
    <p>Name: {localUser.firstName + " " + localUser.lastName}</p>
    <p>Total distance: {(distance1 + distance2).toFixed(1)}</p>
    <p>Price: {fare}</p>
    <p>Date: {date}</p>
    <div class="rating">
      <p>Please rate your experience:</p>
      <div class="stars">
        {#each Array(5) as _, i}
          <span class="star" on:click={() => handleStarClick(i+1)}>
            {#if i < rating}
              &#9733;
            {:else}
              &#9734;
            {/if}
          </span>
        {/each}
      </div>
      <textarea class="feedback" on:input={handleFeedbackChange} value={feedback} placeholder="Leave feedback"></textarea>
      <button on:click={handleSubmit}>Submit</button>
    </div>
  </div>
{:catch error}
  <p>{error.message}</p>
{/await}
  
  <style>
  .receipt {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    font-family: Arial, sans-serif;
    color: #333;
    padding: 32px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    max-width: 600px;
    margin: 0 auto;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-top: 16px;
  }

  .detail {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .label {
    font-weight: bold;
  }

  .rating {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-top: 24px;
    width: 100%;
  }

  .stars {
    display: flex;
    gap: 8px;
    font-size: 32px;
  }

  .star {
    cursor: pointer;
    transition: color 0.2s;
  }

  .star:hover, .star:focus {
    color: #ffcc00;
  }

  .feedback {
    width: 100
  }
  </style>