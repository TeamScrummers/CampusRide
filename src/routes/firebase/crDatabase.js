import { app } from "./initialFirebase"
import { getDatabase, ref, onValue, set, get, child, update } from "firebase/database";

const database = getDatabase(app);
export let readDb;

//Create Operation
//  Location needs to be in format, without angle brackets: "<table>/" + <key>
//        location: "users/" + userID
//  Data needs to be in format, { value1, value2, value3...}
//        data: { email: "email@email.com", password: "psswrd" }
export function CreateFromDatabase(path, data){
    set(ref(database, path), data);
    console.log("Data written");
}

//Read operation
//  Location needs to be in format, without angle brackets: "<table>/<pk>
//          location: users/userID
export function readFromDatabaseGet(path){
    get(child(ref(database), "user/userId")).then((snapshot) => {
        if(snapshot.exists()){
            console.log(snapshot.val());
        } else {
            console.log("No Data avilable");
        }
    }).catch((error) => {
        console.error(error);
    });
}

//Update operation
export function updateFromDatabase(path, data){
    update(ref(database, path), data)
}

//export function readFromDatabaseOnValue(location){
//    onValue(ref(database, location), (snapshot) => {
//        const data = snapshot.val();
//        readDb = 4;
//    })
//}