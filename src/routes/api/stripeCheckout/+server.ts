// localhost:3030/api/stripeCheckout
import type { RequestHandler } from '@sveltejs/kit';
import { PUBLIC_STRIPE_KEY } from '$env/static/public'
import { readFromDatabaseOnValue } from '../../firebase/Database'
import { getUserID } from '../../firebase/Auth.js';
import { get } from 'svelte/store';
import { fareStore } from '../../firebase/Store'

const userID = getUserID()
let fare = 2
fareStore.subscribe(value => {
    fare = value
  });
fare = fare*100

import Stripe from 'stripe';

const stripe = new Stripe(PUBLIC_STRIPE_KEY, {
    apiVersion: '2022-11-15'
});

export const POST: RequestHandler = async ({request}) => {
    const data = await request.json()

    const User = await readFromDatabaseOnValue(`users/${userID}/`)
    if (User) {
        const fare = (await readFromDatabaseOnValue(`trips/${User.tempTripID}/fare/`))*100
    }
    // Gives us a checkout URL
    const session = await stripe.checkout.sessions.create({
        line_items: [ // all arguments are required
        {
          price_data: {
            unit_amount: fare,
            currency: 'usd',
            product_data: {
              name: 'CampusRide Fare'
            },
          },
          quantity: 1,
        },
      ],
        mode: 'payment',
        success_url: "http://localhost:3030/tripenroute",
        cancel_url: "http://localhost:3030/tripenroute",
    });
    return new Response(
        JSON.stringify({ url: session.url }), // url to pass to frontend
        {
            status: 200,
            headers: { 'content-type': 'application/json' }
        }
    )
}