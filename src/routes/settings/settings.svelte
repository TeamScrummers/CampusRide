<script>
    import { goto } from '$app/navigation'
    import { getUserID } from '../firebase/Auth';
    import { readFromDatabaseOnValue, updateFromDatabase } from '../firebase/Database';

    const userID = getUserID()
    let localUser

    let currentPassword = '';
    let tmpPassword = '';
    let newPassword = '';
    let confirmPassword = '';

    async function fetchData() {
      localUser = await readFromDatabaseOnValue(`users/${userID}`)
      currentPassword = localUser.password
    }

    async function changePassword() {
        if((tmpPassword === currentPassword) && (newPassword === confirmPassword) ) {
            localUser.password = newPassword;
            updateFromDatabase(`users/${userID}`,localUser);
        }
    }

    fetchData()
</script>

<div class="container">
    <h1>Settings</h1>
    <form>
    <h2>Change Password</h2>
    <div class="form-group">
        <label for="current-password">Current Password</label>
        <input type="password" id="current-password" bind:value={tmpPassword}>
    </div>
    <div class="form-group">
        <label for="new-password">New Password</label>
        <input type="password" id="new-password" bind:value={newPassword}>
    </div>
    <div class="form-group">
        <label for="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" bind:value={confirmPassword}>
    </div>
    <button type="submit" on:click={changePassword}>Save Changes</button>
    </form>
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
        margin-bottom: 20px;
    }

    h2 {
        margin-top: 40px;
        margin-bottom: 20px;
    }

    form {
        margin-bottom: 40px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    input[type="text"],
    input[type="password"] {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
    }

    button[type="submit"] {
        display: block;
        width: 100%;
        padding: 10px;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        background-color: #2c3e50;
        border: none;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        transition: background-color 0.3s ease;
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
</style>
  