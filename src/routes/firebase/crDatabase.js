import { app } from "./initialFirebase"
import { getDatabase, ref, onValue, set, get, child, update, 
    orderByChild,equalTo, query, limitToFirst} from "firebase/database";

const database = getDatabase(app);

/**
 * @brief Module that OVERWRITES data into the Realtime database
 *
 * Local function that writes data into the firebase, JSON tree, 
 * realtime database. Must be provided with a path to the database and 
 * a key:value pair list. Data WILL BE OVERWRITTEN if the path given 
 * already exists.
 *
 * @param path The location in the JSON tree to create the data. This
 * parameter requires a string input in the following format to match
 * entity-relationship: "\<table>/\<primaryKey>"
 * @param data The list of key:value pairs to be stored. For javascript
 * it should be in the format: { key1:value1, key2:value2,...}
 */
export function createFromDatabase(path, data){
    set(ref(database, path), data);
    console.log("The provided data has been written to the database.");
}


/**
 * @brief An async function for searching the Firebase realtime database
 * 
 * Local function that searches the database and returns a single entry.
 * The return is a promise, since getting data from Firebase is
 * considered slow. To ensure that there are no issues with undefined
 * data, this function MUST be called by an async-await function.
 * 
 * @param table The first node of the JSON list. To match with
 * entity-relationship, this would be the table name, the FROM
 * clause. This paramater must be a string. 
 * @param key The specific key to look up. To match with
 * entity-relationship, this would be the column name, the left compare
 * of the WHERE clause. This paramter must be a string.
 * @param value The specific value we are looking for. To match with
 * entity-relationship, this would be the value stored, the right
 * compare of the WHERE clause.
 * @returns A promise for an entry in the database. Therefore it should 
 * be paired with the await keyword in an async function.
 */
export function searchFromDatabase(table, key, value){
    const selectQ = query(ref(database, table), orderByChild(key), equalTo(value));
    return new Promise(resolve => {
        onValue(selectQ, (snapshot) => {
            resolve(snapshot.val());
        })  
    })
}

export function readFromDatabaseOnValue(path){
    return new Promise(resolve => {
        onValue(ref(database, path), (snapshot) => {
            resolve(snapshot.val());
        })
    })
};

export function updateFromDatabase(path, data){
    update(ref(database, path), data)
}
