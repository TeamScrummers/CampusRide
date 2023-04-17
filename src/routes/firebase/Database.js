import { app } from "./initialFirebase"
import { getDatabase, ref, onValue, set, get, child, update, 
    orderByChild,equalTo, query, limitToFirst, push} from "firebase/database";

const database = getDatabase(app)


    /**
     * @brief Module that OVERWRITES data into the Realtime database
     *
     * Localthat writes data into the firebase, JSON tree 
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
    export function createANodeInDatabase(path, data){
        set(ref(database, path), data);
        console.log("The provided data has been written to the database.");
    }


    /**
     * @brief An asyncfor searching the Firebase realtime database
     * 
     * Localthat searches the database and returns a single entry.
     * The return is a promise, since getting data from Firebase is
     * considered slow. To ensure that there are no issues with undefined
     * data, thisMUST be called by an async-await
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
     * be paired with the await keyword in an async
     */
    export function searchFromDatabase(table, key, value){
        const selectQ = query(ref(database, table), orderByChild(key), equalTo(value));
        return new Promise(resolve => {
            onValue(selectQ, (snapshot) => {
                resolve(snapshot.val());
            })  
        })
    }

    /**
     * @brief Returns data from real time database
     * @param {path} path - Firebase path to be read
     * @returns - Promise at path location
    */
    export function readFromDatabaseOnValue(path){
        return new Promise(resolve => {
            onValue(ref(database, path), (snapshot) => {
                resolve(snapshot.val());
            })
        })
    };

    /**
     * @brief Updates DB by writing data to path
     * @param {path} path - Firebase path to be updated
     * @param {object} data - Data to be written?
    */
    export function updateFromDatabase(path, data){
        update(ref(database, path), data)
    }

    /**
     * @brief Pushes an object to the database
     * @param {path} path - Firebase path to be pushed to
     * @param {object} object - Object to be pushed
    */
    export function pushAnObjectToDatabase(path, object){
        push(ref(database, path), object)
    }

    /**
     * @brief Deletes data from real time database
     * @param {path} path - Firebase path to be updated
     * @param {string} field - Field to be deleted
    */
    export function deleteDataFromDatabase(path, field) {
        console.log("Deleting...")
        update(ref(database, path), { [field]: null });
    }

    /**
     * @brief Loops through every entry in a Firebase path and performs an action on each entry.
     * @param {path} path - Firebase path to be read
     * @param  action - Action to be performed on each entry. The actionshould take a single argument, which is the child snapshot.
    */
    export function loopThroughDatabase(path, action){
        onValue(ref(database, path), (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                action(childSnapshot);
            });
        });
    };

