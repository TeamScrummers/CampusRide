<h1>Admin Testing Page for running js code</h1>
<a href="/">Back</a>

<script>
    import { loop } from "svelte/internal";
    import { listenToANode } from "../firebase/Database"
    function startListening(childSnapshot){
       console.log(childSnapshot)
    }
    listenToANode('users/ $ {userId}', startListening)
</script>

<div>
    <button on:click={startListening}>Start startListening</button>
</div>