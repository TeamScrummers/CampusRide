<script>
    import { goto } from '$app/navigation'

    let fullName = 'John Doe';
    let email = 'johndoe@example.com';
    let vehicleMake = 'Toyota';
    let vehicleModel = 'Camry';
    let vehicleYear = '2020';
    let licensePlate = 'ABC123';
    let vehicleColor = 'Blue';

    function handleSubmit(event) {
      event.preventDefault();
      // code to submit the form data
    }
  
    function handleSignOut() {
      // code to sign out the user
    }

    function handleSettings() {
      goto('./settings');
    }
</script>
    <div class="container">
      <h1>{fullName || 'Your Information'}</h1>
      <form on:submit={handleSubmit}>
        <div style="display:flex; flex-direction:column">
          <label>
            Full Name:
            <input type="text" bind:value={fullName} />
          </label>
          <label>
            Email:
            <input type="email" bind:value={email} />
          </label>
          <h2>Vehicle Information</h2>
          <label>
            Make:
            <input type="text" bind:value={vehicleMake} />
          </label>
          <label>
            Model:
            <input type="text" bind:value={vehicleModel} />
          </label>
          <label>
              Year:
              <input type="text" bind:value={vehicleYear} />
            </label>
          <label>
            License Plate:
            <input type="text" bind:value={licensePlate} />
          </label>
          <label>
            Color:
            <input type="text" bind:value={vehicleColor} />
          </label>
          <button type="submit">Save</button>
        </div>
        </form>
      <!-- <button on:click={handleSignOut}>Sign Out</button>
      <button class="settings-button" on:click={handleSettings}>
        <i class="fa fa-cog"></i>
      </button> -->
    </div>


<style>
    .container {
        max-width: 300px;
        margin: 0 auto;
        padding: 20px;
        overflow: scroll;
        height: auto;
    }

    .container::-webkit-scrollbar {
        width: 0px; /* hide the default scrollbar */
    }

    h1 {
      text-align: center;
      font-size: 24px;
      margin-bottom: 30px;
    }
  
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background-color: #f0f0f0;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
  
    label {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
    }
  
    input[type="text"],
    input[type="email"] {
      padding: 10px;
      border-radius: 5px;
      border: none;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
  
    input[type="text"]:focus,
    input[type="email"]:focus {
      outline: none;
      box-shadow: 0 0 0 2px #2c3e50;
    }
  
    h2 {
      font-size: 18px;
      margin-top: 40px;
      margin-bottom: 20px;
    }
  
    button[type="submit"] {
      margin-top: 30px;
      padding: 10px 20px;
      background-color: #2c3e50;
      color: #fff;
      border: none;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }
  
    button[type="submit"]:hover {
      background-color: #34495e;
    }
  
    button {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #fff;
      color: #2c3e50;
      border: 2px solid #2c3e50;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }
  
    button:hover {
      background-color: #2c3e50;
      color: #fff;
    }
    .settings-button {
        background-color: white;
        color: #2c3e50;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        cursor: pointer;
    }

    .settings-button:hover {
        background-color: #34495e;
    }

    /* Style the icon */
    .settings-button i {
        font-size: 20px;
    }

</style>