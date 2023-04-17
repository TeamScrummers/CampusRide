<script>
    import { getUserID } from "../firebase/Auth";
    import { searchFromDatabase, readFromDatabaseOnValue } from "../firebase/Database";
    import { matchMake } from "../matching/MatchMaking";
    import { User } from "../matching/User";
  
    export let mode = "passenger"
    export let passengers = []
    export let match = []
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
      localUser = User.fromJSON(await readFromDatabaseOnValue('users/${userID}/'))
  
      match = [localUser,]
    }
    async function acceptPassenger (passenger) {
      var localUser = new User()
      localUser = User.fromJSON(await readFromDatabaseOnValue('users/${userID}/'))
  
      match = [localUser,passenger]
      //makeTrip(match)
    }
  </script>
  
  <b>Test Page for Driver Accepting Passenger & Passengers In Queue</b>
  <button on:click={passengerMode}>Passenger Mode</button>
  <button on:click={driverMode}>Set mode to driver and log passengers</button>
  
  {#if mode === 'driver'}
    {#each passengers as passenger}
      <p>{passenger.firstName} {passenger.lastName} <button on:click={acceptPassenger(passenger)}>Accept</button> </p>
    {/each}
  {:else}
    <p>Mode is not driver</p>
  {/if}


  <style>
    .button{
        height: fit-content
    }
    .p{
        text-align: center;
    }



  </style>