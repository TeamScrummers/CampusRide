<script>
  import { onMount } from 'svelte';
  import { matchMake, removeFromMatchMaking, updateMatchMaking,  } from '../matching/MatchMaking.js';
  import { User } from '../matching/User.js';
  import { get, writable } from "svelte/store";
  import { matchMakingPool, waitingPool } from "../firebase/Store.js";

  // Fancy button code
  import { getUserID } from '../firebase/Auth.js';
  export let text = "Match Make";
  export let onClickMatch = () => {
    // for (const user of users) {
    //   updateMatchMaking(user)
    // }
    // Subscribe to the matchMakingPool and waitingPool stores and log their values when they are updated
    matchMakingPool.subscribe(value => {
      console.log("matchMakingPool:")
      console.log(value)
    })
    waitingPool.subscribe(value => {
      console.log("waitingPool:")
      console.log(value)
    })

    console.log("MatchMake:")
    var result = matchMake(matchMakingPool)
    console.log(result)
    console.log("End MatchMaking Tests")

  };

  export let onClickUpdate = () => {
    for (const user of users) {
      updateMatchMaking(user)
    }
  };

  export let onClickDelete = () => {
    removeFromMatchMaking(user1)
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
  <button on:click={onClickMatch}>{text}</button>
  <button on:click={onClickUpdate}>{"Update Match Making Pool"}</button>
  <button on:click={onClickDelete}>{"Remove From Match Making Pool"}</button>
</div>
<div>
  asd
</div>
