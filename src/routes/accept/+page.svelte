<script>
  import { getUserID } from "../firebase/Auth";
  import { searchFromDatabase, readFromDatabaseOnValue } from "../firebase/Database";
  import { User } from "../matching/User";
  import { Trip } from "../firebase/Trip"
    import { goto } from "$app/navigation";

  export let mode = "passenger"
  export let passengers = []
  const userID = getUserID()

  async function passengerMode() {
    mode = 'passenger'
  }
  async function driverMode() {
    mode = 'driver';
    const passengersObj = await searchFromDatabase("users", "mode", "passenger");
    const passengersArray = Object.keys(passengersObj).map(key => passengersObj[key])
    passengers = passengersArray
    console.log(passengers);
    var localUser = new User()
    localUser = User.fromJSON(await readFromDatabaseOnValue(`users/${userID}/`))
  }
  async function acceptPassenger (passenger) {
    var localUser = new User()
    localUser = User.fromJSON(await readFromDatabaseOnValue(`users/${userID}/`))

    Trip.makeTrip(localUser, User.fromJSON(passenger))
    goto("/trippickup")
  }
</script>

<h3>Active Passengers</h3><br>
<!-- <button on:click={passengerMode}>Passenger Mode</button> -->
<button on:click={driverMode}>Request Passengers</button>
<br>

{#if mode === 'driver'}
  {#each passengers as passenger}
  <div style="border: 1px solid black; padding: 10px; margin: 5px; width: auto; display: inline-block">
    <p>{passenger.firstName} {passenger.lastName}</p>
    <p>Latest Arrival Time: {new Date(passenger.latestArrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
    <button on:click={acceptPassenger(passenger)}>Accept</button>
  </div>
  
  {/each}
{:else}
  <p>Searching for Matches...</p>
{/if}
