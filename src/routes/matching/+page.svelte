<script>
	import { onMount } from "svelte";
	import { goto } from '$app/navigation'
	import Map from '../map/map.svelte';
	import { Driver, Passenger, MatchedRide } from './MatchedRide.js';
	// Accessing Stores
	import { get } from "svelte/store";
    import { appMode } from "../firebase/crStore";
	


	// Test objects
	const driver = new Driver("John Doe", "+1-555-123-4567", "SUV", true);
	const passenger = new Passenger("Jane Smith", "+1-555-987-6543", "789 Broad St, Anytown, USA", "123 Elm St, Anytown, USA");
	const MatchedRideObj = new MatchedRide(driver, passenger, "$25");


	onMount(async () => {
    // do stuff?
  	});
</script>

<section>
	<div class = "map-overlay">
		{#if MatchedRideObj}
		<h1>Your ride has been matched!</h1>
		<ul>
		  <li>Driver name: {MatchedRideObj.name}</li>
		  <li>Driver phone number: {MatchedRideObj.phoneNumber}</li>
		  <li>Vehicle type: {MatchedRideObj.vehicleType}</li>
		  <li>Pickup location: {MatchedRideObj.pickupLocation}</li>
		  <li>Destination: {MatchedRideObj.destination}</li>
		  <li>Price: {MatchedRideObj.tripPrice}</li>
		  <li>App Mode: {get(appMode)}</li>
		</ul>
		
		<button on:click={null}>Confirm ride</button>
	  {:else}
		<h1>No available rides found</h1>
	  {/if}
		<button type="button" on:click={() => goto('/trippickup')}>Submit</button>
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