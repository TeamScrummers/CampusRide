import {pushAnObjectToDatabase, updateFromDatabase} from "./Database"

export function createANewTrip(tripObject){
    pushAnObjectToDatabase("trips/", tripObject)
}

export function updateTrip(tripId, data){
    updateFromDatabase("trips/"+ tripId, {
        driverId: data
    });
}
