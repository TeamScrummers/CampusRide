<script>
  import { locateUser } from '../map/locateuser';
  import { goto } from '$app/navigation'
  import Geocoder from '../map/geocoder.svelte';
  import { updateFromDatabase } from '../firebase/Database';
  import { getUserID } from '../firebase/Auth.js';
  import { timeStringToDate } from '../passenger/timeStringToDate';


  let timeInput = ''
  
  /**
  *  Updates the timeInput variable with the value of the input event target.
  *  @param {Event} event - The input event.
  *  @return {void}
  */
  function handleTimeInput(event) {
    timeInput = event.target.value;
  }

  /**
   * @brief Submits a driver form to the database after converting timeInput to a Date object, and sets the user's availability, latest arrival time, and mode as "driver".
   * @returns {void}
   */
  async function submitDriver() {
    //  HTML time to JS Date
    let timeOutput = timeStringToDate(timeInput)

    // Updating DB & proceeding
    const userID = getUserID()
    locateUser()
    updateFromDatabase(`users/${userID}`, {available: true})
    updateFromDatabase(`users/${userID}`, {latestArrival: timeOutput.toISOString()})
    updateFromDatabase(`users/${userID}`, {mode: "driver"})
    goto('/accept')
  }
</script>

<section>
  <div class="map-overlay">
    <div class="location-overlay">
      <h4 class="overlay-title">Driver Mode</h4>
      <h4 class="overlay-subtitle">Where are you going to?</h4>
      <div class="geocoder-container">
        <Geocoder></Geocoder>
      </div>
    </div>

    <div class="time-overlay">
      <h4 class="overlay-subtitle">When do you need to be there?</h4>
      <form class="time-form">
        <input type="time" class="time-input" bind:value={timeInput} on:input={handleTimeInput} />
      </form>
    </div>

    <div class="button-container">
      <button type="button" class="mode-button" on:click={() => submitDriver() }>GO</button>
    </div>

</section>


<style>
  .map-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 999;
  }

  .location-overlay {
    margin-bottom: 10px;
    text-align: center;
  }

  .overlay-title {
    color: #000000;
    font-size: 20px;
    font-weight: bold;
    position: relative;
    margin-bottom: 10px;
    bottom: -155px;
  }
 /* Text for everything */
  .overlay-subtitle {    
    color: #000000;
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 20px;
    position: relative;
    bottom: -150px;
  }

  .geocoder-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: -140px;
  }

  .time-overlay {
    margin-bottom: 10px;
    text-align: center;
  }

  .time-form {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .time-input {
    font-size: 2rem;
    padding: 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    background-color: #FFFFFF;
    color: #000000;
    position: relative;
    bottom: -140px;
  }

  .mode-button {
  background-color: #04AA6D;
  color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  position: relative;
  font-size: 20px;
  font-weight: bold;
  bottom: -150px;
  width: 150px;
  height: 50px;
  outline: none;
}
  .mode-button:hover {
    background-color: darkgreen;
    opacity: 0.9;
  }
  .mode-button.loading::after {
  content: "";
  display: inline-block;
  width: 0.8em;
  height: 0.8em;
  margin-left: 0.5em;
  border-radius: 50%;
  border: 0.2em solid white;
  border-color: white transparent white transparent;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

  .button-container {
    text-align: center;
  }


</style>
