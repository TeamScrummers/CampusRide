<script>
	import { goto } from '$app/navigation'
	import { latestArrival1, latestArrival2} from './stores.js';
	import { User } from './user.js'; 
	import Map from '../map/map.svelte';


	// Test Objects
	let user1 = new User('Zachery', 'McDonald', latestArrival1)
	let user2 = new User('Jason', 'Bourne', latestArrival2)

	// Testing
	let time1 = user1.latestArrival
	let time2 = user2.latestArrival
	let match = user1.compareTime(user1.latestArrival, user2.latestArrival)

	// let thirthyMin = 1800000;

	// Useful methods for date() objs:
	// var.setHours(x,y,z)
	// var.getTime(x,y,z)
</script>


<section>
	<div class = "map-overlay">
		<p> {user1.firstName} {user1.lastName}'s Latest Arrival: {time1} <br>
			{user2.firstName} {user2.lastName}'s Latest Arrival: {time2} <br>
			Comparison: {match} <br>
			<button type="button" on:click={() => goto('/trippickup')}>Submit</button>
		</p>
	<a href="/">Back</a>
	</div>
  </section>


<Map></Map>