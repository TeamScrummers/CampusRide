<script>
	import { goto } from '$app/navigation'
	import { latestArrival1, latestArrival2} from './stores.js';
	import { User } from './user.js'; 
	import Map from '../map/map.svelte';
	import { destinationCoords, latestArrival, userCoords} from '../firebase/Store.js'
	import { createANodeInDatabase, readFromDatabaseOnValue, searchFromDatabase} from "../firebase/Database.js"


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

	// HARD CODING FOR TESTING
	// destinationCoords.set('-96.4676986,30.6463875')
	// latestArrival.set('10:00')
	// userCoords.set('-96.3442659,30.5832877')
	// END HARD CODING

	function writeEntry() {
        createANodeInDatabase("users/userId", { username: "name", email: "email"})
    }
    async function readFromDb(id){
        var result = Object.values(await readFromDatabaseOnValue("users/" + id))
        console.log(result[1]);
		return result[1]
    }
    async function searchFromDb(){
        var result = Object.keys( await searchFromDatabase("users", "email", "kcantu7@leomail.tamuc.edu"));
        console.log(result[0]);
    }

    //crTrip
    import{ createTrip, updateTrip } from "../firebase/Trip.js"

    async function requestTrip(){
        var passengerId = Object.keys(await searchFromDatabase("users", "email", "email@email.com"))
        createTrip(passengerId[0], "801 Fairview Ave", "3100 SH-47, Bryan, TX 77807, United States");
    }
    async function matchMade(){
        var driverId = Object.keys(await searchFromDatabase("users", "email", "kcantu7@leomail.tamuc.edu"))
        updateTrip("001", driverId[0])
    }

    //crDrivers.js
    import {provideDriverList, provideDriverLocation} from "../firebase/Drivers.js"

    async function requestDriverList(info){
        var id = await provideDriverList();
		var name = readFromDb(id);
		return name;
    }
    //crStore.js
    import { get } from 'svelte/store'
    import { storedID, storedLocation } from '../firebase/Store.js'

    async function acceptDriver (info){
		var id = await provideDriverList();
        let address = await provideDriverLocation(id)
        storedID.set(id)
        storedLocation.set(address)
        goto('/trippickup')
    }
</script>

<section>
	<div class = "map-overlay">
		<p> 
		</p>
		<div class = "driver-list" >
			<h4 style="color: black; text-align: center;">Drivers Found:</h4>
			{user1.firstName} {user1.lastName}'s Latest Arrival: {time1} <br>
			{user2.firstName} {user2.lastName}'s Latest Arrival: {time2} <br>
			Comparison: {match} <br>
			<button type="button" on:click={() => goto('/trippickup')}>Submit</button>
		<div class >
			<h4>Driver Found!</h4>
			<ul>
				{#await requestDriverList()}
					<li><p>Driver: Searching for Matches</p></li> 
				{:then info}
					<li> <p style="color: black;">
						Driver 1: {info} <button type="button" class="accept-button" on:click={() => acceptDriver(info)}>Accept Driver</button>
					</p></li>
				{:catch error}
					<li><p style="color: red">{error.message}</p></li>
				{/await}
			</ul>
		</div>
	</div>
</section>
<Map></Map>

<style>
	    .map-overlay{
        background-color: rgb(209, 209, 209);
        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        position: absolute;
        top: -75px;
        bottom: -200px;
        left: -75px;
        width: 300px;
      }

	  .driver-list{
		background-color: hsl(0, 0%, 92%);
		border-radius: 20%
	  }

	  .accept-button{
		background-color: #04AA6D;
        color: white;
        padding: 1px 1px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 25%;
        opacity: 0.9;
        border-radius: 10%;
	  }

	  .accept-button:hover{
        opacity: 1;
	  }

</style>