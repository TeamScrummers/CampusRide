<script>
	import { latestArrival1, latestArrival2} from './stores.js';
	import { User } from './user.js'; 

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
<p> {user1.firstName} {user1.lastName}'s Latest Arrival: {time1} <br>
		{user2.firstName} {user2.lastName}'s Latest Arrival: {time2} <br>
		Comparison: {match} <br>
</p>
<a href="/">Back</a>