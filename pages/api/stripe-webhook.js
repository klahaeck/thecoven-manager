const stripe = require('stripe');
import getRawBody from 'raw-body';
import stripeHandler from '../../lib/stripeEventHandlers';

export default async function handler(req, res) {
  const rawBody = await getRawBody(req);

  let event;
  try {
    const sig = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET);
  } catch (err) {
    return res.status(400).send({ error: `Webhook Error: ${err.message}`});
  }

  stripeHandler(event);

  // Return a 200 response to acknowledge receipt of the event
  return res.status(200).send();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
