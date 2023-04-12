<h1>Admin Testing Page for running js code</h1>
<a href="/">Back</a>

<script>
    import { dbObject } from "../firebase/Database"
    let stuff = dbObject.getListener()
    if(typeof stuff !== "undefined"){
        console.log(stuff)
    }
    
    function logListener(){
        stuff = dbObject.getListener()
    }
</script>

<div>
    <button on:click={logListener}>Click pls</button>
    {JSON.stringify(stuff)}
</div>