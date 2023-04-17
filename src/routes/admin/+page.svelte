<h1>Admin Testing Page for running js code</h1>
<a href="/">Back</a>

<script>
    import { loop } from "svelte/internal";
    import { listenToANode, createANodeInDatabase, pushAnObjectToDatabase, readFromDatabaseOnValue, searchFromDatabase } from "../firebase/Database"
    
    function startListening(childSnapshot){
       console.log(childSnapshot)
    }
    listenToANode('users/Xs2gMrAJtvTP8u1Ffvfv8nVyzAw1', startListening)

    function writeEntry() {
        createANodeInDatabase("users/userId", { username: "name", email: "email"})
    }

    async function readFromDb(){
            var result = await readFromDatabaseOnValue("users/userId")
            console.log(JSON.stringify(result))
            return JSON.stringify(result)

 
    }
    async function searchFromDb(){
        var result = Object.keys( await searchFromDatabase("users", "email", "kcantu7@leomail.tamuc.edu"));
        console.log(result[0]);
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