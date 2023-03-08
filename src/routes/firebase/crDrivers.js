import { searchFromDatabase } from "./crDatabase";

export async function provideDriverList(){
    const result = Object.keys(await searchFromDatabase("drivers", "firstName", "Kolby"))
    console.log(result[0])
    return result[0]
}