<h1>Admin Testing Page for running js code</h1>
<a href="/">Back</a>

<script>
    import { loop } from "svelte/internal";
    import { loopThroughDatabase } from "../firebase/Database"
    async function startListening(stuff){
       console.log(stuff)
    }

    var stuff
    loopThroughDatabase("users/Xs2gMrAJtvTP8u1Ffvfv8nVyzAw1", startListening(stuff))
</script>

<div>
    <button on:click={startListening}>Start startListening</button>
</div>