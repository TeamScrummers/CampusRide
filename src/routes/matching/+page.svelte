<script>
	import { onMount } from "svelte";
	import { goto } from '$app/navigation'
	import Map from '../map/map.svelte';
	import { User } from './User.js';
	import { Trip } from "./Trip";
	// Accessing Stores
	import { get } from "svelte/store";
    import { appMode } from "../firebase/crStore";
	


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



	onMount(async () => {
    // do stuff?
  	});
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