import { firebaseClass } from "./initialFirebase";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

//Object to initalize our application, should only be used with other firebase js
export class authClass extends firebaseClass {
        constructor(){
        super();
        this.auth = getAuth(this.firebaseApp);
        onAuthStateChanged(this.auth, user=> {
                if(user != null){
                    console.log('Logged in :)x');
                }
                else {
                    console.log('No user :(');
                }
            });
        }
}
