<script>
	import { onMount } from "svelte";
	import { goto } from '$app/navigation'
	import Map from '../map/map.svelte';
	import { User } from './User.js';
	import { Trip } from "./Trip";
	import { get } from "svelte/store";
    import { appMode } from "../firebase/Store";
	
	// Fancy button code
	import { getUserID } from '../firebase/Auth.js';
	export let text = "Get UID";
	export let onClick = () => {alert(getUserID())};
</script>

<section>
	<div class = "map-overlay">
		{#if true}
		<h1>Your ride has been matched!</h1>
		<ul>
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

			<button on:click={() => goto('/matchmakingtest')}>
				Go to MatchMakingTest
			</button>
			<button on:click={onClick}>{text}</button>
			
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