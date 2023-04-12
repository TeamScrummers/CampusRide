import { getAuth, createUserWithEmailAndPassword,
        signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, set, ref, update} from "firebase/database";
import { app } from "./initialFirebase"
import { goto } from '$app/navigation'

const auth = getAuth();
const database = getDatabase(app);

export function handleOnRegister(email, password){
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            set(ref(database, 'users/' + user.uid), {
                email: email,
                password: password
            })
                .then(() => {
                    alert('user created successfully');
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
                    alert('user logged in successfully')
                    console.log(getUserID())
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
 * Gets the currently authenicated user's ID. 
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