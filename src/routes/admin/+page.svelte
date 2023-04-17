<h1>Admin Testing Page for running js code</h1>
<a href="/">Back</a>

<script>
    import { loop } from "svelte/internal";
    import { listenToANode } from "../firebase/Database"
    
    function startListening(childSnapshot){
       console.log(childSnapshot)
    }
    listenToANode('users/ $ {userId}', startListening)

    async function readFromDb(){
            var result = await readFromDatabaseOnValue("users/userId")
            console.log(JSON.stringify(result))
            return JSON.stringify(result)

 
    }
    async function searchFromDb(){
        var result = Object.keys( await searchFromDatabase("users", "email", "kcantu7@leomail.tamuc.edu"));
        console.log(result[0]);
    }

    //crTrip
    import{ createANewTrip, updateTrip } from "../firebase/Trip.js"

    async function requestTrip(){
        var passengerId = Object.keys(await searchFromDatabase("users", "email", "email@email.com"))
        createANewTrip(passengerId[0], "801 Fairview Ave", "3100 SH-47, Bryan, TX 77807, United States");
    }
    async function matchMade(){
        var driverId = Object.keys(await searchFromDatabase("users", "email", "kcantu7@leomail.tamuc.edu"))
        updateTrip("001", driverId[0])
    }

    //crDrivers.js
    import {provideDriverList, provideDriverLocation} from "../firebase/Drivers.js"

    function requestDriverList(){
        return provideDriverList();
    }
    //crStore.js
    import { get } from 'svelte/store'
    import { storedID, storedLocation } from '../firebase/Store.js'

    async function acceptDriver (id){
        let address = await provideDriverLocation(id)
        storedID.set(id)
        storedLocation.set(address)
        goto('/trippickup')
    }

    //notifications
    import {sendTheUserAPushNotifcation} from '../firebase/PushNotifications.js'
    import {sendDriverAcceptedNotifcation} from '../firebase/PushNotifications.js'
    import {sendPassengerAvailableNotifcation} from '../firebase/PushNotifications.js'
    import {sendDriverArrivedNotifcation} from '../firebase/PushNotifications.js'

    //Push A User object
    import { User } from '../matching/User'
    const userProflie = new User("Test User", "John", "Doe", "555-1324", "321 South St", "456 Maple Ave", "sedan", true, "thirtyMinutesFromNow")
    function pushUserProfile(){
        pushAnObjectToDatabase("users", userProflie);
        console.log("Push successful")
    }

</script>

<div class="container" style="background-color:#f1f1f1">
      <button type="button" on:click={writeEntry}>Write Entry</button>
      <button type="button" on:click={readFromDb}>Read From Db</button>
      <button type="button" on:click={searchFromDb}>Search From Db</button>
      <br><br>
</div>



<div class="container" style="background-color:#f1f1f1">
    <button type="button" on:click={requestTrip}>Request a trip</button>
    <button type="button" on:click={matchMade}>Accept match?</button>
    <br><br>
</div>

<div class="container" style="background-color:#f1f1f1">
    <button type="button" on:click={requestDriverList}>Request Driver List</button>
</div>

<div class="container" style="background-color:#f1f1f1">
    <!-- <DriverList bind:this={child} on:show={e => child.shown = e.detail}> -->
    <ul>
        
        {#await readFromDb()}
            <li><p>Driver: Searching for Matches</p></li> 
        {:then info}
            <li> <p>
                Driver 1: {info} <button type="button" on:click={() => acceptDriver(info)}>Accept Driver</button>
            </p></li>
        {:catch error}
            <li><p style="color: red">{error.message}</p></li>
        {/await}
    
        {#await requestDriverList()}
            <li><p>Driver: Searching for Matches</p></li>
        {:then info}
            <li> <p>
                Driver 2: {info} <button type="button" on:click={() => acceptDriver(info)}>Accept Driver</button>
            </p></li>
        {:catch error}
            <li><p style="color: red">{error.message}</p></li>
        {/await}
    </ul>
</div> 

<div class="container" style="background-color:#f1f1f1">
    <button type="button" on:click={sendTheUserAPushNotifcation}>Notify Yourself</button>
    <br><br>
</div>

<div class="container" style="background-color:#f1f1f1">
    <button type="button" on:click={sendDriverAcceptedNotifcation}>Driver Accepted</button>
    <br><br>
</div>

<div class="container" style="background-color:#f1f1f1">
    <button type="button" on:click={sendPassengerAvailableNotifcation}>Passenger Available</button>
    <br><br>
</div>

<div class="container" style="background-color:#f1f1f1">
    <button type="button" on:click={sendDriverArrivedNotifcation}>Driver Arrived</button>
    <br><br>
</div>

<div class="container" style="background-color:#f1f1f1">
    <button type="button" on:click={pushUserProfile}>Push User Profile</button>
    <br><br>
</div>