// import chargeFailed from './chargeFailed';
// import chargeRefunded from './chargeRefunded';
// import chargeSucceeded from './chargeSucceeded';
// import chargeUpdated from './chargeUpdated';
// import checkoutSessionCompleted from './checkoutSessionCompleted';
// import customerSubscriptionCreated from './customerSubscriptionCreated';
// import customerSubscriptionDeleted from './customerSubscriptionDeleted';
// import customerSubscriptionUpdated from './customerSubscriptionUpdated';
// import paymentIntentCreated from './paymentIntentCreated';
import paymentIntentSucceeded from './paymentIntentSucceeded';

const stripeHandler = async (event) => {
  switch (event.type) {
    // case 'charge.failed':
    //   chargeFailed(event.data.object);
    //   break;
    // case 'charge.refunded':
    //   chargeRefunded(event.data.object);
    //   break;
    // case 'charge.succeeded':
    //   chargeSucceeded(event.data.object);
    //   break;
    // case 'charge.updated':
    //   chargeUpdated(event.data.object);
    //   break;
    // case 'checkout.session.completed':
    //   checkoutSessionCompleted(event.data.object);
    //   break;
    // case 'customer.subscription.created':
    //   customerSubscriptionCreated(event.data.object);
    //   break;
    // case 'customer.subscription.deleted':
    //   customerSubscriptionDeleted(event.data.object);
    //   break;
    // case 'customer.subscription.updated':
    //   customerSubscriptionUpdated(event.data.object);
    //   break;
    // case 'payment_intent.created':
    //   paymentIntentCreated(event.data.object);
    //   break;
    case 'payment_intent.succeeded':
      await paymentIntentSucceeded(event.data.object);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};

export default stripeHandler;