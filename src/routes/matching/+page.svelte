<script>
	import { onMount } from "svelte";
	import { goto } from '$app/navigation'
	import Map from '../map/map.svelte';
	import { User } from './User.js';
	import { Trip } from "./Trip";
	// Accessing Stores
	import { get } from "svelte/store";
    import { appMode } from "../firebase/Store";
	


	// Test objects
	const noonMarch2023 = new Date(2023, 2, 20, 12, 0, 0, 0);
	const noonToday = new Date();
	noonToday.setHours(12, 0, 0, 0);
	const driver = new User('UID1', 'John', 'Doe', '555-1234', '123 Main St', '456 Elm St', 'sedan', true, noonToday);
	const passengers = [
		new User('UID2', 'Jane', 'Doe', '555-5678', '123 Main St', '456 Elm St', null, false, noonToday),
		new User('UID3', 'Bob', 'Smith', '555-9012', '123 Main St', '456 Elm St', null, true, noonToday)
	];
	const trip = new Trip('TID1', driver, passengers, '123 Main St', '456 Elm St', 20.00, noonToday);
	//console.log(trip.toJSON());



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
		{#if trip}
		<h1>Your ride has been matched!</h1>
		<ul>
			<li>Trip ID: {trip.tripId}</li>
			<li>Driver name: {trip.driver.firstName} {trip.driver.lastName}</li>
			<li>Driver phone number: {trip.driver.phoneNumber}</li>
			<li>Vehicle type: {trip.driver.vehicleType}</li>
			<li>Pickup location: {trip.startLocation}</li>
			<li>Destination: {trip.driver.endLocation}</li>
			<li>Price: {trip.fare}</li>
			<li>Date: {trip.date}</li>
			<li>App Mode: {get(appMode)}</li>
			<!-- Display List of Passenger destinations -->
		</ul>
		<button on:click={null}>Confirm ride</button>
		{:else}
			<h1>No available rides found</h1>
		{/if}
			<button type="button" on:click={() => goto('/trippickup')}>
				Go to trip pickup
			</button>

			<button on:click={() => goto('/MatchMakingTest')}>
				Go to MatchMakingTest
			</button>
			
	</div>
</section>

<Map></Map>

<style>
	    .map-overlay{
        background-color: rgb(255, 255, 255);
        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        position: absolute;
        top: -75px;
        bottom: -200px;
        left: -75px;
        width: 300px;
      }
</style>