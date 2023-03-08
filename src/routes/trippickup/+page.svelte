<!-- trip pick up -->
<script>
  import Map from './map.svelte';
  import { get } from 'svelte/store'
  import { storedID, storedLocation } from '../firebase/crStore.js';

  var driverID = get(storedID)
  var driverLocation = get(storedLocation)
  // console.log(driverID)
  // console.log(driverLocation)
  
</script>

<section class="content">
  <div class="container">
    <h1>Trip Pick Up</h1>
  </div>
</section>
<Map></Map>

<style>
  :global(#logo svg) {
    fill: white;
    height: 60px;
  }
</style>
