import { readFromDatabaseOnValue, searchFromDatabase } from "./crDatabase";

export async function provideDriverList(){
    const result = Object.keys(await searchFromDatabase("drivers", "firstName", "Kolby"))
    console.log(result[0])
    return result[0]
}

export async function provideDriverLocation(uid){
    const result = Object.values(await readFromDatabaseOnValue("drivers/" + uid))
    console.log(result[1])
    return result[1]
}