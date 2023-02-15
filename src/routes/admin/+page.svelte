<h1>Admin Testing Page for running js code</h1>
<a href="/">Back</a>

<script>
    import {firestoreClass} from "../firebase/crFirestore"
    const db = new firestoreClass();
    function writeEntry() {
        db.createEntry();
    }

//Old code for testing auth
//    import {authClass} from "../firebase/crAuth";
//    
//    const user = new authClass();
</script>


<div class="container" style="background-color:#f1f1f1">
      <button type="button" on:click={writeEntry}>Help :D</button>
</div>


