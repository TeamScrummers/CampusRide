
  <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            background-color: black;
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
        }

        .registerbtn:hover {
            opacity: 1;
        }


        a {
            color: dodgerblue;
        }


        .signin {
            background-color: #f1f1f1;
            text-align: center;
        }
    </style>
<!--
<form>
    <div class="container">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr>

        <label for="email"><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="email" id="email" required>

        <label><b>Password</b></label>
        <input type="password" placeholder="Password" name="psw" id="psw" required>

        <hr>

        <button type="button" id="submitData" name="submitData" class="registerbtn">Register</button>
    </div>

    <div class="container signin">
        <p>Already have an account? <a href="#">Sign in</a>.</p>
    </div>
</form>
-->

<script>
    import{ handleOnRegister, handleOnLogin} from "../firebase/crAuth";
    let emailReg;
    let passwordReg;
    let emailLog;
    let passwordLog;
</script>


<body>
<form on:submit={ handleOnRegister(emailReg, passwordReg) }>
    <div class="container">
        <h1>Register</h1>
        <p>Please fill in this form to create an account</p>
        <hr>

        <label for="email"><b>Email</b></label>
        <input type="text" name="email" placeholder="email" bind:value={emailReg}>

        <label for="password"><b>Password</b></label>
        <input type="password" name="password" placeholder="password" bind:value={passwordReg}>
        <button name="submitData" class="registerbtn">Register</button>

        <hr>
    </div>
</form>

<form on:submit={ handleOnLogin(emailLog, passwordLog) }>
    <div class="container">
        <h1>Login</h1>
        <p>Please fill in this form to login</p>
        <hr>

        <label for="email"><b>Email</b></label>
        <input type="text" name="email" placeholder="email" bind:value={emailLog}>

        <label for="password"><b>Password</b></label>
        <input type="password" name="password" placeholder="password" bind:value={passwordLog}>
        <button name="submitData" class="registerbtn">Login</button>

        <hr>
    </div>
</form>


<a href="/">Back</a>
</body>