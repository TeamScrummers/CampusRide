import { app } from "./initialFirebase"
import { getDatabase, ref, onValue } from "firebase/database";

const database = getDatabase(app);


export function writeToDatabase(location, data){
    set(ref(database, location), data)
}

export function readFromDatabaseOnValue(location, data){
    onValue(ref(database, ))
}