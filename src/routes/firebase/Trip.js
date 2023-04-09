import {createANodeInDatabase, updateFromDatabase} from "./Database"

export function createTrip(path, passenger, pickup, destionation){
    // Trips: tripId,   diverId,    passengerId,    pickupGPS,  destionationGPS
    createANodeInDatabase(path, {
        driverId: "",
        passengerId: passenger,
        pickupGPS: pickup,
        destionationGPS: destionation
    });
}

//Update the trip function:
//  The tripId referse to which trip we are referring to
export function updateTrip(tripId, data){
    updateFromDatabase("trips/"+ tripId, {
        driverId: data
    });
}