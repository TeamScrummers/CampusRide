
<!-- trip over page -->

<section class="content">
    <div class="container">
      <h1>Driver Accepts Driver Page</h1>
      <a href="/">Back </a>
    </div>
  </section>
  
  <script>
    import Map from '../map/map.svelte';
    let isDrawerOpen = false;
  
    function toggleDrawer() {
      isDrawerOpen = !isDrawerOpen;
    }
  </script>
  
  <Map></Map>
  
  <style>
    .drawer {
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
      overflow-y: scroll
    }
  
    .drawer.open {
      height: 200px;
    }
  
    .handle {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: white;
      box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      transition: transform 0.3s ease-out;
    }
  
    .handle:hover {
      transform: translateX(-50%) translateY(-10px);
    }
  
    .icon {
      width: 30px;
      height: 30px;
      fill: grey;
      transition: fill 0.3s ease-out;
    }
  
    .handle:hover .icon {
      fill: black;
    }
    /* button style layout */
    .buttons {
     display: flex;
      justify-content: space-between;
    margin-top: 16px;
    }
.accept-button, .deny-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
.accept-button {
  background-color: #00c853;
  color: white;
}
.deny-button {
  background-color: #f44336;
  color: white;
}
  /* content box style layout */
  .content-box {
    padding: 16px;
    height: 100%;
    overflow-y: scroll;
  }
  .content-box h2 {
    margin-top: 0;
  }
  </style>
  
  <div class={`drawer ${isDrawerOpen ? "open" : ""}`}>
    <!-- Drawer content goes here -->


    
    <div class="driver-info">
      <h2>Driver Info</h2>
      <p>Passenger one</p>
      <ul>
        <li><strong>Driver Name:</strong> John Smith</li>
        <li><strong>Total Distance:</strong> 50 miles</li>
        <li><strong>Pickup Destination:</strong> 123 Main St.</li>
        <li><strong>Total Trip Distance:</strong> 100 miles</li>
      </ul>
      <div class="buttons">
        <button class="accept-button">Accept</button>
        <button class="deny-button">Deny</button>
      </div>
    </div>
  
    <div class="action-buttons">
      <h2>Passenger 1</h2>
      <ul>
        <li><strong>Driver Name:</strong> Jane Doe</li>
        <li><strong>Total Distance:</strong> 100 miles</li>
        <li><strong>Pickup Destination:</strong> Sesame St.</li>
        <li><strong>Total Trip Distance:</strong> 150 miles</li>
      </ul>
      <div class="buttons">
        <button class="accept-button">Accept</button>
        <button class="deny-button">Deny</button>
      </div>
    </div>
  
    <div class="passenger2">
      <h2>Passenger 2</h2>
      <ul>
        <li><strong>Driver Name:</strong> Ryan Reynolds </li>
        <li><strong>Total Distance:</strong> 200 miles</li>
        <li><strong>Pickup Destination:</strong> HollyWood St.</li>
        <li><strong>Total Trip Distance:</strong> 300 miles</li>
      </ul>
      <div class="buttons">
        <button class="accept-button">Accept</button>
        <button class="deny-button">Deny</button>
      </div>
    </div>

    <div class="passenger3">
      <h2>Passenger 3</h2>
      <ul>
        <li><strong>Driver Name:</strong> Me the realist </li>
        <li><strong>Total Distance:</strong> 500 miles</li>
        <li><strong>Pickup Destination:</strong> Ballin.</li>
        <li><strong>Total Trip Distance:</strong> Too far away, miles</li>
      </ul>
      <div class="buttons">
        <button class="accept-button">Accept</button>
        <button class="deny-button">Deny</button>
      </div>
    </div>


    </div>
  
  <div class="handle" on:click={toggleDrawer}>
    <svg class="icon" viewBox="0 0 24 24">
      <path d="M7,12L12,7L17,12H7Z" />
    </svg>
  </div>