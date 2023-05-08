import { readFromDatabaseOnValue } from '../firebase/Database'
import { getUserID } from '../firebase/Auth.js';
let userID = getUserID()

export async function checkout() {
	let fare = Math.round((await readFromDatabaseOnValue(`users/${userID}/tempFare/`))*100)
	await fetch("api/stripeCheckout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(
				{ fare: fare}
		)
	}).then((data) => {
		return data.json()
	}).then((data) => {
		window.location.replace(data.url);
	});
}