// localhost:3030/api/stripeCheckout
import type { RequestHandler } from '@sveltejs/kit';
import Stripe from 'stripe';
import { PUBLIC_STRIPE_KEY } from '$env/static/public'

const stripe = new Stripe(PUBLIC_STRIPE_KEY, {
    apiVersion: '2022-11-15'
});

export const POST: RequestHandler = async ({request}) => {
    const data = await request.json()
    
    // Gives us a checkout URL
    const session = await stripe.checkout.sessions.create({
        line_items: [ // all arguments are required
        {
          price_data: {
            unit_amount: data.fare,
            currency: 'usd',
            product_data: {
              name: 'CampusRide Fare'
            },
          },
          quantity: 1,
        },
      ],
        mode: 'payment',
        success_url: "http://localhost:3030/login",
        cancel_url: "http://localhost:3030/cancel",
    });
    return new Response(
        JSON.stringify({ url: session.url }), // url to pass to frontend
        {
            status: 200,
            headers: { 'content-type': 'application/json' }
        }
    )
}