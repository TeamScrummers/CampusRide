<script>
    import { onMount } from 'svelte';
    import { matchMake } from '../matching/MatchMaking.js';
    import { User } from '../matching/User.js';

    const twentyMinutesFromNow = new Date(Date.now() + 20 * 60000);
    const thirtyMinutesFromNow = new Date(Date.now() + 30 * 60000);
    const fortyMinutesFromNow = new Date(Date.now() + 40 * 60000);
  
    // Define some test users
    const user1 = new User(1, "John", "Doe", "555-1234", "321 South St", "456 Maple Ave", "sedan", true, twentyMinutesFromNow, "driver" );
    const user2 = new User(2, "Jane", "Doe", "555-5678", "123 Main St", "456 Maple Ave", null, true, thirtyMinutesFromNow , "passenger" );
    const user3 = new User(3, "Bob", "Smith", "555-9012", "123 Main St", "456 Maple Ave", null, true, fortyMinutesFromNow, "passenger" );
  
    // Call matchMake with the test users
    onMount(() => {
      var result = matchMake([user1, user2, user3]);
      console.log(result)
      console.log("End MMT File")
    });
</script>
  
<h1>MatchMaking Test Page</h1>
<button onclick="window.history.back()">Go Back</button>