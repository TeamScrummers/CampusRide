<h1>Admin Testing Page for running js code</h1>
<a href="/">Back</a>

<script>
    import { createFromDatabase, readFromDatabaseOnValue, searchDb, readDb, searchFromDatabase} from "../firebase/crDatabase"
    function writeEntry() {
        createFromDatabase("users/userId", { username: "name", email: "email"})
    }
    function readFromDb(){
        readFromDatabaseOnValue("users/userId");
        readFromDatabaseOnValue("users/userId");
        console.log(readDb);
    }
    function searchFromDb(){
        searchFromDatabase("users", "email", "email@email.com");
        var result = Object.keys(searchDb);
        console.log(result[0]);
    }
</script>


<div class="container" style="background-color:#f1f1f1">
      <button type="button" on:click={writeEntry}>Write Entry</button>
      <button type="button" on:click={readFromDb}>Read From Db</button>
      <button type="button" on:click={searchFromDb}>Search From Db</button>
</div>


