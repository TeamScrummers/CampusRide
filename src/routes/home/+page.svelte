<head>
  <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet">
</head>

<script>
  import Map from '../map/map.svelte';
  import Profile from '../profile/profile.svelte';
  import Settings from '../settings/settings.svelte'
  import Driver from '../driver/driver.svelte';
  import Passenger from '../passenger/passenger.svelte';
  import { handleSignOut } from '../firebase/Auth';

  let settingsMode = false;
  let mode = 'passenger';
  let isSideDrawerOpen = false;
  let isBottomDrawerOpen = true;

  // Toggle function for app mode slider.
  function toggleMode() {
    if (mode === 'passenger') {
      mode = 'driver';
    } else {
      mode = 'passenger';
    }
  }

  // Toggle function for side drawer (profile content).
  function toggleSideDrawer() {
    isSideDrawerOpen = !isSideDrawerOpen;
  }
  // Toggle function for bottom drawer (driver/passenger input).
  function toggleBottomDrawer() {
    isBottomDrawerOpen = !isBottomDrawerOpen;
  }

  // Button inside side drawer to swap side drawer to settings mode. 
  function changeSettingsMode() {
    settingsMode = !settingsMode;
  }

</script>

<!-- Interactive background map for decoration -->
<div class="map-container">
  <Map />
</div>

  <!-- Mode Swap Div -->
  <div class="mode-switch-container">
    {#if mode === 'passenger'}
      <label class="mode-label" for="mode-switch-container">Passenger</label>
    {:else}
      <label class="mode-label" for="mode-switch-container" style="opacity: .3">Passenger</label>
    {/if}
    <label class="mode-switch">
      <input type="checkbox" id="mode-switch-input" on:change={toggleMode}>
      <span class="mode-slider round"></span>
    </label>
    {#if mode === 'driver'}
      <label class="mode-label" for="mode-switch-container">Driver</label>
    {:else}
      <label class="mode-label" for="mode-switch-container" style="opacity: .3">Driver</label>
    {/if}
  </div>

  <!-- Side Drawer Div -->
  <div class={`drawer ${isSideDrawerOpen ? "open" : ""}`}>
    <!-- Side Handle Div -->
    <div class="handle" on:click={toggleSideDrawer}>
      <svg class="icon" viewBox="0 0 24 24">
        <path d="M7,12L12,7L17,12H7Z" />
      </svg>
    </div>
    {#if (settingsMode === false)}
    <div class="profilePage">
      <Profile></Profile>
    </div>  
    <div class="alignButtons">
      <button class="settings-button" on:click={changeSettingsMode}>
        <i class="fa fa-cog"></i>
      </button>
      <button class="backButton" on:click={handleSignOut}>Sign Out</button>
    </div>
    {/if}
    {#if (settingsMode === true)}
    <div class="settingsPage">
      <Settings></Settings>
    </div>
      <div class="alignButtons">
        <button class="backButton" on:click={changeSettingsMode}>Back</button>
      </div>
    {/if}
  </div>

  <!-- Dim background element -->
<div class={`dim-overlay ${isSideDrawerOpen ? "open" : ""}`}></div>

  <!-- Second Bottom Drawer Div -->
  <div class={`bottom-drawer ${isBottomDrawerOpen ? "open" : ""}`}>
    <!-- Bottom Handle Div -->
    <div class="bottom-handle" on:click={toggleBottomDrawer}>
    <svg class="bottom-icon" viewBox="0 0 24 24">
      <path d="M7,12L12,7L17,12H7Z" />
    </svg>
    </div>
    {#if mode === 'passenger'}
        <Passenger></Passenger>
    {/if}
    {#if mode === 'driver'}
        <Driver></Driver>
    {/if}
  </div>

<style>

.go-button {
  background-color: green;
  color: white;
  padding: 10px 20px;
  border-radius: 50%;
  height: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
  top: 50%;
  left: 50%;
  bottom: -200px;
  transform: translate(-50%, -50%);
}

.go-button:hover {
  background-color: darkgreen;
}

.go-button.loading::after {
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

.bottom-drawer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: height 0.3s ease-out;
  font-family: 'Josefin Sans', sans-serif;
  /* overflow-y: scroll */
}

.bottom-drawer.open {
  height: 330px;
  padding: 10px;
}

.drawer-content {
  padding: 16px;
}

.handle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #00cf23;
  cursor: pointer;
}

.bottom-handle {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 6%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease-out;
}

.bottom-handle:hover {
  transform: translateX(-50%) translateY(-10px);
}

.dim-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  display: none;
}

.dim-overlay.open {
  display: block;
}

.map-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
  }

.page {
  background: none;
  background-color: none;
}

.map {
  display: flex;
  position: relative;
  z-index: -1;
}

.trip-cost {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-radius: 15px;
    background-color: black;
    color: white;
    font-size: 16px;
    font-weight: bold;
    z-index: 1;
    max-width: 50px;
    max-height: 30px;
    margin: 0 auto;
  }

  .alignButtons{
    display: flex;
    /* align-items: center; */
    justify-content: center;    
  }

  .profilePage{
    padding-top: 25%;
    display: flex;
    height: 90%;
    overflow: scroll;
    align-items: center;
  }

  .settingsPage{
    /* padding-top: 100%; */
    display: flex;
    height: 90%;
    overflow: scroll;
    align-items: center;
  }

  .profilePage::-webkit-scrollbar {
        width: 0px; /* hide the default scrollbar */
    }

  .settingsPage::-webkit-scrollbar {
      width: 0px; /* hide the default scrollbar */
  }

  .map-overlay {
    display: flex;
    flex-direction: row;
    justify-content: center;
    color:#000000;
    margin-top: 10px;
    margin-left: 10px;
    padding: 10px;
    height: auto;
    z-index: 1;
    max-width: 300px;
    max-height: 400px;
    margin: 0 auto;
    }
  .location-overlay{
    position: relative;
  }
  .time-overlay{
    position: relative;
  }
    
  .mode-button {
    position: relative;
    background-color: #04AA6D;
    color: white;
    margin: 10px 10;
    cursor: pointer;
    opacity: .7;
    height: 50px;
    width: 75%;
    font-size: 40px;
    font-style: italic;
    display: inline-block;
    font-size: 25px;
  }
  .button-container {
    text-align: center;
  }
  .mode-button:hover {
    opacity: 1;
  }
  .mode-switch-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  font-size: 16px;
  color: #333;
  position: absolute;
  top: 10px;
  right: 50px;
}
.mode-label {
  text-transform: uppercase;
  letter-spacing: 1px;
}
.mode-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.mode-switch input[type="checkbox"] {
  display: none;
}
.mode-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}
.mode-slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
input[type="checkbox"]:checked + .mode-slider {
  background-color: #2196F3;
}
input[type="checkbox"]:checked + .mode-slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
.round {
  border-radius: 34px;
}
.iframe-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
#iframe1 {
  height: 70%;
  width: 70%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: transparent;
}
.drawer {
  position: fixed;
  top: 0;
  left: -30vh; /* Move the drawer off screen to the left */
  width: 30vh;
  height: 100%;
  background-color: white;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s ease-out; /* Use transform instead of height */
  z-index: 100;
}
  .drawer.open {
    transform: translateX(30vh); /* Move the drawer back onto the screen */
  }
  .handle {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 4%;
    left: 1%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    box-shadow: 5px 0 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.3s ease-out, right 0.3s ease-out;
    z-index: 100;
}
.drawer.open .handle {
  right: 200px;
  transform: translate(-50%, -50%) rotate(180deg); /* adjust the transform property for open state */
  box-shadow: -5px 0 10px rgba(0, 0, 0, 0.2);
}
.handle:hover {
  transform: translateX(10px) translateY(-50%);
}
.icon {
  width: 30px;
  height: 30px;
  fill: grey;
  transition: fill 0.3s ease-out;
  z-index: 100;
  transform: rotate(90deg);
}
.handle:hover .icon {
  fill: black;
}
.bottom-icon {
  width: 30px;
  height: 30px;
  fill: grey;
  transition: fill 0.3s ease-out;
  z-index: 100;
}
.handle:hover .bottom-icon {
  fill: black;
}
.iframe2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.backButton {
  margin: 10px;
  padding: 10px 20px;
  background-color: #fff;
  color: #2c3e50;
  border: 2px solid #2c3e50;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  height: fit-content;
  width: fit-content;
}

.backButton:hover {
  background-color: #2c3e50;
  color: #fff;
}

.settings-button {
  margin: 10px;
  background-color: white;
  color: #2c3e50;
  border-radius: 5px;
  border: 2px solid #2c3e50;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  height: fit-content;
  width: fit-content;
}

.settings-button:hover {
  background-color: #34495e;
}

/* Style the icon */
.settings-button i {
  font-size: 20px;
}
</style>
