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

export function handleOnLogin(email, password){
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            var lgDate = new Date();
            update(ref(database, 'users/' + user.uid), {
                last_login: lgDate,
            })
                .then(() => {
                    alert('user logged in successfully');
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