import { firebaseClass } from "./initialFirebase";
import { getFirestore, doc, setDoc,updateDoc} from 'firebase/firestore';

//Object to initalize our application, should only be used with other firebase js
export class firestoreClass extends firebaseClass {
        constructor(){
        super();
        this.firestore = getFirestore(this.firebaseApp);
        }


        createEntry(){
            //Local variable used create a new entry in firestore (The Primary Key)
            const newEntry = doc(this.firestore,'asdf/user'); 
            
            //Variable that holds the data itself
            const docData = {
                FirstName: 'John',
                price: 400,
                //button: 'Used a button to make this :DDDDDD'
            };
            //Creates or Replaces setDoc(asdf, docData);
            //Merges data if doc exists updateDoc(asdf, docData);
            //Creates or merges 
            setDoc(newEntry, docData, {merge: true});
            console.log('Added data to firestore');
        }
}
