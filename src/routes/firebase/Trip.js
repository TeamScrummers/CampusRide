import {pushAnObjectToDatabase, updateFromDatabase} from "./Database"

export function createANewTrip(tripObject){
    pushAnObjectToDatabase("trips/", tripObject)
}

export function updateTripChild(tripId, data){
    updateFromDatabase("trips/"+ tripId, {
        driverId: data
    });
}