<h1>Admin Testing Page for running js code</h1>
<a href="/">Back</a>

<script>
    //crDatabse
    import { createFromDatabase, readFromDatabaseOnValue, searchFromDatabase} from "../firebase/crDatabase"
    
    function writeEntry() {
        createFromDatabase("users/userId", { username: "name", email: "email"})
    }
    async function readFromDb(){
        var result = await readFromDatabaseOnValue("users/userId")
        console.log(result);
    }
    async function searchFromDb(){
        var result = Object.keys( await searchFromDatabase("users", "email", "kcantu7@leomail.tamuc.edu"));
        console.log(result[0]);
    }

    //crTrip
    import{ createTrip, updateTrip } from "../firebase/crTrip.js"

    async function requestTrip(){
        var passengerId = Object.keys(await searchFromDatabase("users", "email", "email@email.com"))
        createTrip(passengerId[0], "801 Fairview Ave", "3100 SH-47, Bryan, TX 77807, United States");
    }
    async function matchMade(){
        var driverId = Object.keys(await searchFromDatabase("users", "email", "kcantu7@leomail.tamuc.edu"))
        updateTrip("001", driverId[0])
    }

    //crDrivers.js
    import {provideDriverList} from "../firebase/crDrivers.js"

    function requestDriverList(){
        provideDriverList();
    }
</script>


<div class="container" style="background-color:#f1f1f1">
      <button type="button" on:click={writeEntry}>Write Entry</button>
      <button type="button" on:click={readFromDb}>Read From Db</button>
      <button type="button" on:click={searchFromDb}>Search From Db</button>
</div>



<div class="container" style="background-color:#f1f1f1">
    <button type="button" on:click={requestTrip}>Request a trip</button>
    <button type="button" on:click={matchMade}>Accept match?</button>
</div>

<div class="container" style="background-color:#f1f1f1">
    <button type="button" on:click={requestDriverList}>Request Driver List</button>
</div>
