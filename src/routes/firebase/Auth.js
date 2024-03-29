import { getAuth, createUserWithEmailAndPassword,
        signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, set, ref, update} from "firebase/database";
import { app } from "./initialFirebase"
import { goto } from '$app/navigation'

const auth = getAuth();
const database = getDatabase(app);

/**
 * @brief Registers a new user with the provided details in the Firebase authentication and logs real time database
 *
 * @param {string} email
 * @param {string} password 
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} phoneNumber
 * @param {string} vehicleColor
 * @param {string} vehicleMake
 * @param {string} vehicleModel
 * @param {string} vehicleYear
 * @param {string} licensePlate
 *
 * @returns {void}
 */
export function handleOnRegister(email, password, firstName, lastName, phoneNumber, vehicleColor, vehicleMake, vehicleModel, vehicleYear, licensePlate){
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            set(ref(database, 'users/' + user.uid), {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                vehicleColor: vehicleColor,
                vehicleMake: vehicleMake,
                vehicleModel: vehicleModel,
                vehicleYear: vehicleYear,
                licensePlate: licensePlate
            })
                .then(() => {
                    alert('User created successfully');
                    goto('/login')
                })
                .catch((error) => {
                    alert(error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
}


/**
 * @brief Handles loging in with Firebase Auth, logs time when last login. 
 * @param string email - User email for login
 * @param string password - User password for login
*/
export function handleOnLogin(email, password){
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            var lgDate = new Date();
            update(ref(database, 'users/' + user.uid), {
                last_login: lgDate,
            })
                .then(() => {
                    //alert('User logged in successfully')
                    // console.log(getUserID())
                    goto('/home')
                })
                .catch((error) => {

                    alert(error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
}

/**
 * @brief Gets the currently authenicated user's ID. 
 * @returns {string|null} - Returns the user's unique ID as a string or null if no user is logged in.
 */
export function getUserID() {
    const user = auth.currentUser;
    if (user) {
      // User logged in already or has just logged in.
      return user.uid;
    } else {
      // User not logged in or has just logged out.
      return null;
    }
  }

/**
 * @brief Handles user sign out.
 * @function handleSignOut
 * @returns {void}
 */
export function handleSignOut() {
    signOut(auth).then(() => {
        // Sign-out successful.
        goto('/login')
        // console.log("Sign-out successful")
    }).catch((error) => {
        // An error happened.
        // console.log("An error happened")
    });
}