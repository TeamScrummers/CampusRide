<script>
  import { onMount } from 'svelte';
  import { matchMake, removeFromMatchMaking, updateMatchMaking,  } from '../matching/MatchMaking.js';
  import { User } from '../matching/User.js';
  import { get, writable } from "svelte/store";
  import { matchMakingPool, waitingPool, storedPair } from "../firebase/Store.js";

  var result;
  export let onClickMatch = () => {
    storedPair.set(matchMake(matchMakingPool))
  };

  export let onClickUpdate = () => {
    for (const user of users) {
      updateMatchMaking(user)
    }
  };

  export let onClickDelete1 = () => {
    removeFromMatchMaking(user1)
  };
  export let onClickDelete2 = () => {
    removeFromMatchMaking(user2)
  };
  export let onClickDelete3 = () => {
    removeFromMatchMaking(user3)
  };
  export let onClickDelete4 = () => {
    removeFromMatchMaking(user4)
  };




  

  // Some test date objs
  const twentyMinutesFromNow = new Date(Date.now() + 20 * 60000);
  const thirtyMinutesFromNow = new Date(Date.now() + 30 * 60000);
  const fortyMinutesFromNow = new Date(Date.now() + 40 * 60000);

  // Define some test users
  const user1 = new User("John", "Doe", "555-1234", "321 South St", "456 Maple Ave", "sedan", true, twentyMinutesFromNow, "driver" );
  const user2 = new User("Jane", "Doe", "555-5678", "123 Main St", "456 Maple Ave", null, true, fortyMinutesFromNow , "passenger" );
  const user3 = new User("Bob", "Smith", "555-9012", "123 Main St", "456 Maple Ave", null, true, twentyMinutesFromNow, "passenger" );
  const user4 = new User("Gos", "Drith", "445-9742", "563 Harvey St", "466 Oak Ave", null, true, fortyMinutesFromNow, "passenger" );

  const users = [user1, user2, user3, user4]
  
  onMount(() => {
    
    });
</script>

<h1>MatchMaking Test Page</h1>
<div>
  <button onclick="window.history.back()">Go Back</button>
  <button on:click={onClickUpdate}>{"Update Match Making Pool"}</button>
  <button on:click={onClickMatch}>{"Make A Match"}</button>
  <div>
    <button on:click={onClickDelete1}>{"Remove John"}</button>
    <button on:click={onClickDelete2}>{"Remove Jane"}</button>
    <button on:click={onClickDelete3}>{"Remove Bob"}</button>
    <button on:click={onClickDelete4}>{"Remove Gos"}</button>
  </div>
</div>
<div>
  <h2>Match Making Pool:</h2>
  <div>{JSON.stringify($matchMakingPool)}</div>
  <h2>Waiting Pool:</h2>
  <div>{JSON.stringify($waitingPool)}</div>
  <h2>Matched Pair:</h2>
  <div>{JSON.stringify($storedPair)}</div>
</div>
