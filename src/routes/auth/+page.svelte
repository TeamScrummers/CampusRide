<script>
    import{ handleOnRegister } from "../firebase/Auth"
    
    let emailReg;
    let passwordReg;
    let firstName = '';
    let lastName = '';
    let phoneNumber = '';
    let vehicleMake = '';
    let vehicleModel = '';
    let vehicleYear = '';
    let licensePlate = '';
    let vehicleColor = '';
</script>

<head>
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet">
</head>


<body>
    <form on:submit={ handleOnRegister(emailReg, passwordReg, firstName, lastName, phoneNumber, vehicleColor, vehicleMake, vehicleModel, vehicleYear, licensePlate) }>
        <div class="container">
            <h1>Register</h1>
            <hr>
            <h2>Personal Information</h2>
    
            <label for="email"><b>Email</b> <span style="color: red;">*</span></label>
            <input type="text" name="email" placeholder="Email" bind:value={emailReg} required>

            <label for="password"><b>Password</b> <span style="color: red;">*</span></label>
            <input type="password" name="password" placeholder="Password" bind:value={passwordReg} required>

            <label for="fName"><b>First Name</b> <span style="color: red;">*</span></label>
            <input type="text" name="fName" placeholder="First Name" bind:value={firstName} required>
            
            <label for="lName"><b>Last Name</b> <span style="color: red;">*</span></label>
            <input type="text" name="lName" placeholder="Last Name" bind:value={lastName} required>

            <label for="phoneNumber"><b>Phone Number</b> <span style="color: red;">*</span></label>
            <input type="text" name="phoneNumber" placeholder="Phone Number" bind:value={phoneNumber} required>
    
            <h2>Vehicle Information</h2>

            <label for="vColor"><b>Vehicle Color</b></label>
            <input type="text" name="vColor" placeholder="Color" bind:value={vehicleColor}>
    
            <label for="vMake"><b>Vehicle Make</b></label>
            <input type="text" name="vMake" placeholder="Make" bind:value={vehicleMake}>
    
            <label for="vModel"><b>Vehicle Model</b></label>
            <input type="text" name="vModel" placeholder="Model" bind:value={vehicleModel}>
    
            <label for="vYear"><b>Vehicle Year</b></label>
            <input type="text" name="vYear" placeholder="xxxx" bind:value={vehicleYear}>

            <label for="lpn"><b>License Plate #</b></label>
            <input type="text" name="lpn" placeholder="123ABC" bind:value={licensePlate}>
    
            <button name="submitData" class="registerbtn">Register</button>
            <hr>
        </div>
    </form>

<div class="container signin">
    <p>Already have an account? <a href="../login">Sign in</a>.</p>
    <p>Return home <a href="/">Home</a>.</p>
</div>
</body>


<style>
    body {
        font-family: 'Josefin Sans', sans-serif;
    }

    * {
        box-sizing: border-box;
    }

    .container {
        padding: 16px;
        background-color: white;
    }

    input[type=text],
    input[type=password] {
        width: 100%;
        padding: 15px;
        margin: 5px 0 22px 0;
        display: list-block;
        border: none;
        background: #f1f1f1;
        font-family: 'Josefin Sans', sans-serif;
    }

    input[type=text]:focus,
    input[type=password]:focus {
        background-color: #ddd;
        outline: none;
    }

    hr {
        border: 1px solid #f1f1f1;
        margin-bottom: 25px;
    }

    .registerbtn {
        background-color: #04AA6D;
        color: white;
        padding: 16px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 50%;
        opacity: 0.9;
        position: relative;
        left: 280px;
        border-radius: 10px;
        font-family: 'Josefin Sans', sans-serif;
    }

    .registerbtn:hover {
        opacity: 1;
    }

    a {
        color: dodgerblue;
        font-family: 'Josefin Sans', sans-serif;
    }

    .signin {
        background-color: #f1f1f1;
        text-align: center;
        font-family: 'Josefin Sans', sans-serif;
    }
</style>