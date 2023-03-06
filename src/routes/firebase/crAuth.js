
    import { getAuth, createUserWithEmailAndPassword,
            signInWithEmailAndPassword, signOut } from "firebase/auth";
    import { getDatabase, set, ref, update } from "firebase/database";
    import{ writable } from "svelte/store";
    import { app } from "./initialFirebase"

    // Initialize Firebase
    const auth = getAuth();
    const database = getDatabase(app);
    
    const user = writable({
    password: " ",
    email: " "
    })

    //Resgistration function
    export function handleOnRegister(email, password){
        createUserWithEmailAndPassword(auth, email, password)
         .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == "auth/email-already-in-user"){
                    alert("User with provided email is already created.")
                } else {
                    alert(errorMessage);
                }
                console.log(error)
            });
    }

    //Login Function
    export function handleOnLogin(email, password){
        signInWithEmailAndPassword(auth, email, password)
        .catch(function(error) {
               var errorCode = error.code;
               var errorMessage = error.message;
               if (errorCode == "auth/user-not-found"){
                    alert("Provided credentials are not found with a known user.");
               } else if(errorCode == "auth/invalid-email"){
                    alert("Please enter a valid email address.");
               } else if(errorCode == "") {
                    console.log("Login Successful");
               } else {
                    alert(errorMessage);
               }
               console.log(error);
           });
    }
    
    /*
            .then((userCredential, email, password) => {
    // Signed in
                const user = userCredential.user;
    // user.uid
                set(ref(database, 'users/' + user.uid), {
                    email: email,
                    password: password
                })
                    .then(() => {
    // Data saved
                        alert('user created successfully');
                    })
                    .catch((error) => {
    // Write failed
                        alert(error);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                alert(errorMessage);
            });
            
    // Log in user
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
    // Signed in
                const user = userCredential.user;

    // save log in details into real time database
                var lgDate = new Date();
                update(ref(database, 'users/' + user.uid), {
                    last_login: lgDate,
                })
                    .then(() => {
    // Data saved
                        alert('user logged in successfully');

                    })
                    .catch((error) => {
    // Write failed
                        alert(error);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });

        
        signOut(auth).then(() => {
    // Sign-out successful.
        }).catch((error) => {
    // An error happened.
        });
    //});*/
