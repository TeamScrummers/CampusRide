<script>
  import { onMount } from 'svelte';
  import { matchMake, updateMatchMaking,  } from '../matching/MatchMaking.js';
  import { User } from '../matching/User.js';
  import { get, writable } from "svelte/store";
  import { matchMakingPool, waitingPool } from "../firebase/Store";

  // Fancy button code
  import { getUserID } from '../firebase/Auth.js';
  export let text = "Get UID";
  export let onClick = () => {alert(getUserID())};

  // Some test date objs
  const twentyMinutesFromNow = new Date(Date.now() + 20 * 60000);
  const thirtyMinutesFromNow = new Date(Date.now() + 30 * 60000);
  const fortyMinutesFromNow = new Date(Date.now() + 40 * 60000);

  // Define some test users
  const user1 = new User(1, "John", "Doe", "555-1234", "321 South St", "456 Maple Ave", "sedan", true, twentyMinutesFromNow, "driver" );
  const user2 = new User(2, "Jane", "Doe", "555-5678", "123 Main St", "456 Maple Ave", null, true, fortyMinutesFromNow , "passenger" );
  const user3 = new User(3, "Bob", "Smith", "555-9012", "123 Main St", "456 Maple Ave", null, true, twentyMinutesFromNow, "passenger" );
  const user4 = new User(4, "Gos", "Drith", "445-9742", "563 Harvey St", "466 Oak Ave", null, true, fortyMinutesFromNow, "passenger" );

  const users = [user1, user2, user3, user4]
  for (const user of users) {
    updateMatchMaking(user)
  }

  // Subscribe to the matchMakingPool and waitingPool stores and log their values when they are updated
  matchMakingPool.subscribe(value => {
    console.log("matchMakingPool:")
    console.log(value)
  })
  waitingPool.subscribe(value => {
    console.log("waitingPool:")
    console.log(value)
  })

  // Call matchMake with the test users
  onMount(() => {
    console.log("MatchMake:")
    var result = matchMake(matchMakingPool)
    console.log(result)
    console.log("End MatchMaking Tests")
  });
</script>

<h1>MatchMaking Test Page</h1>
<button onclick="window.history.back()">Go Back</button>
<button on:click={onClick}>{text}</button>
