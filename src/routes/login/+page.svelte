<script>
    import { handleOnLogin } from "../firebase/Auth";
    let emailLog;
    let passwordLog;
</script>

<body>
    <form on:submit={handleOnLogin(emailLog, passwordLog)}>
        <div class="container">
            <img id="carImage" src="/src/routes/login/car.png" alt="car.png">
            <h1>Login</h1>
            <hr>

            <label for="email"><b>Email</b></label>
            <input type="text" name="email" placeholder="email" bind:value={emailLog}>

            <label for="password"><b>Password</b></label>
            <input type="password" name="password" placeholder="password" bind:value={passwordLog}>
            <button name="submitData" class="registerbtn">Login</button>

            <p>Don't have an account? <a href="../auth">Register</a>.</p>
            

            <hr>
        </div>
    </form>

    <!-- <div class="container signin">
        <p>Don't have an account? <a href="../auth">Register</a>.</p>
        <p>Return home <a href="/">Home</a>.</p>
    </div> -->
</body>


<style>
    body {
        font-family: Arial, Helvetica, sans-serif;
    }

    * {
        box-sizing: border-box;
    }

    .container {
        padding: 16px;
        background-color: white;
        max-width: 400px; /* set a maximum width */
        margin: 0 auto; /* center horizontally */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px; /* round off the edges */
    }

    img {
        width: 130px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        position: absolute;
        top: -80px;
        left: 130px;
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
        position: relative;
        /* left: -50px; */
    }
    h1{
        text-align: center;
    }

    .registerbtn {
        background-color: #04AA6D;
        color: white;
        padding: 16px 180px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 50%;
        opacity: 0.9;
        text-align: center;
        position: relative;
        left: 0px;
        border-radius: 10px; /* round off the edges */
        
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
        position: relative;
        top: 10px;
        left: 10px;
    }
</style>
