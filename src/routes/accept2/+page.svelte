
<!-- trip over page -->

<section class="content">
    <div class="container">
      <h1>Driver Accepts Driver Page</h1>
      <a href="/">Back </a>
    </div>
  </section>
  

  
  <script>
    let isDrawerOpen = false;
  
    function toggleDrawer() {
      isDrawerOpen = !isDrawerOpen;
    }
  </script>
  
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


  </style>
  
  <div class={`drawer ${isDrawerOpen ? "open" : ""}`}>
    <!-- Drawer content goes here -->
    <h2>Driver Info</h2>
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
  
  <div class="handle" on:click={toggleDrawer}>
    <svg class="icon" viewBox="0 0 24 24">
      <path d="M7,12L12,7L17,12H7Z" />
    </svg>
  </div>
  