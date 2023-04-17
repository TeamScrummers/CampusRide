import { app } from "./initialFirebase"
import {  getDatabase, ref, onValue, set, get, child, update } from "firebase/database";
import {  orderByChild, equalTo, query, limitToFirst, push } from "firebase/database";
import { User } from "../matching/User";

const database = getDatabase(app);

/**
 * @brief Module that OVERWRITES data into the Realtime database
 *
 * Local function that writes data into the firebase, JSON tree 
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
 * @brief An async function for searching the Firebase realtime database
 * 
 * Local function that searches the database and returns a single entry.
 * The return is a promise, since getting data from Firebase is
 * considered slow. To ensure that there are no issues with undefined
 * data, this MUST be called by an async-await
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
 * be paired with the await keyword in an async function
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
 * @param {string} path - Firebase path to be pushed to
 * @param {object} object - Object to be pushed
 * @returns {Promise<string>} Promise that resolves to the generated key
 */
export function pushAnObjectToDatabase(path, object){
  const newObjectRef = push(ref(database, path), object);
  return get(newObjectRef).then((snapshot) => {
    return snapshot.key;
  });
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
 * @param {function} action - Action to be performed on each entry. The action function should take a single argument, which is the child snapshot.
*/
export function loopThroughDatabase(path, action){
    onValue(ref(database, path), (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            action(childSnapshot);
        });
    });
};

/**
 * @brief Loops through every entry in a Firebase path once and performs an action on each entry.
 * @param {path} path - Firebase path to be read
 * @param {function} action - Action to be performed on each entry. The action function should take a single argument, which is the child snapshot.
*/
export async function loopThroughDatabaseOnce(path, action) {
  const databaseRef = ref(database, path);
  const snapshot = await get(databaseRef);
  snapshot.forEach((childSnapshot) => {
    action(childSnapshot);
  });
};

/**
 * @brief Loops through every entry in a Firebase path and performs an action on each entry.
 * @param {path} path - Firebase path to be read
 * @param  action - Action to be performed on each entry. The actionshould take a single argument, which is the child snapshot.
*/
export async function listenToANode(path, action){
  onValue(ref(database, path), (snapshot) => {
      action(snapshot.val())
  });
};

/**
 * Reads a User object from the db
 * @param {string} userId - The unique identifier for the user object
 * @returns {object|null} - The User object, or null if the user was not found
 */
export async function readUserFromDatabase(userId) {
    const path = `users/${userId}`;
    const userJson = await readFromDatabaseOnValue(path);
    // If user exists in the database, parse the JSON into a User object
    if (userJson) {
      const user = User.fromJSON(userJson);
      console.log(`User with userId ${userId} has been read from the database`);
      return user;
    }
    // If user does not exist in the database, return null
    console.log(`User with userId ${userId} was not found in the database`);
    return null;
  }

/**
 * Writes a User object to the db
 * @param {string} userId - The currently logged in UID for the user object
 * @param {object} user - The User object to be written to the database
 */
export async function writeUserToDatabase(userId, user) {
  const path = `users/${userId}`;
  // Convert the User object to a JSON
  const userJson = user.toJSON();

  // Write the JSON object to the database
  await createANodeInDatabase(path, userJson);

  console.log(`User with userId ${userId} has been written to the database`);
}

/**
 * Reads a Trip object from the db
 * @param {string} TripId - The unique identifier for the Trip object
 * @returns {object|null} - The Trip object, or null if the Trip was not found
 */
export async function readTripFromDatabase(TripId) {
    const path = `trips/${TripId}`;
    const tripJson = await readFromDatabaseOnValue(path);
    // If Trip exists in the database, parse the JSON into a Trip object
    if (tripJson) {
      const trip = Trip.fromJSON(tripJson);
      //console.log(`Trip with TripId ${TripId} has been read from the database`);
      return trip;
    }
    // If trip does not exist in the database, return null
    //console.log(`Trip with TripId ${TripId} was not found in the database`);
    return null;
  }

/**
* @brief Writes a trip object to the db
* @param {object} trip - The Trip object to be written to the database
* @returns - New realtime database tripId of the new trip entry
*/
export async function writeTripToDatabase(trip) {
    const path = 'trips';
    const tripJson = trip.toJSON();
    //console.log('tripJson:', tripJson);
    const result = await pushAnObjectToDatabase(path, tripJson);
    //console.log('push result:', result);
    const tripId = result;
    //console.log(`Trip with TripId ${tripId} has been written to the database`);
    return tripId;
}