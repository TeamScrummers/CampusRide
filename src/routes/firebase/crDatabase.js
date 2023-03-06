import { app } from "./initialFirebase"
import { getDatabase, ref, onValue, set, get, child, update, 
    orderByChild,equalTo, query, limitToFirst} from "firebase/database";

const database = getDatabase(app);
const rootRef = ref(database);
export let readDb
export let searchDb

//Create Operation
//  Location needs to be in format, without angle brackets: "<table>/" + <key>
//        location: "users/" + userID
//  Data needs to be in format, { value1, value2, value3...}
//        data: { email: "email@email.com", password: "psswrd" }
export function createFromDatabase(path, data){
    set(ref(database, path), data);
    console.log("Data written");
}

//Read operation: Search
//  Table is the first node of the json list. For users it will be:
//          table: "user"
//  Key is the specific key value we are looking for. Only use primary key name:
//          key: "email"
//  Value is the specific value we are looking for. 
//          value: "email@email.com"
export function searchFromDatabase(table, key, value){
    const selectQ = query(ref(database, table), orderByChild(key), equalTo(value));
    onValue(selectQ, (snapshot) => {
        searchDb = snapshot.val();;
    })
}

//Read operation: Known path
//  Location needs to be in format, without angle brackets: "<table>/<pk>
//          location: users/userID
export function readFromDatabaseOnValue(path){
    let data;
    onValue(ref(database, path), (snapshot) => {
        readDb = snapshot.val();
    })
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