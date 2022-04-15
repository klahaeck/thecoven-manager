
// HubSpot form id 18d36272-39f7-4056-a22c-9fc48b5ea09a
import Head from 'next/head';
import { useRouter } from 'next/router';
const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
import Layout from '../../layouts/main';
import { Row, Col, Button } from 'react-bootstrap';
import { validateEmail } from '../../lib/validate';

const HubspotFormSubmit = () => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>The Coven Manager - HubSpot Form Submit</title>
      </Head>

      <Layout>
        <Row className="justify-content-center mb-5">
          <Col className="text-center">
            {/* <img src="/images/plane-flying.svg" alt="paper airplane flying" className="img-fluid" width="120" /> */}
            <img src="/images/plane-burning.svg" alt="paper airplane burning" className="img-fluid" width="80" />
          </Col>
        </Row>

        <h1 className="h3 text-center sofia-pro-bold">Shoot!</h1>
        <p className="text-center mb-5">There was an error processing the form submission.</p>

        <div className="text-center">
          <Button variant="outline-light" className="border-3" onClick={() => router.back()}>Go back and try again</Button>
        </div>
      </Layout>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { email, priceId, successUrl, cancelUrl, trialDays } = ctx.query;

  const thisTrialDays = trialDays && trialDays > 0 ? parseInt(trialDays) : undefined;  
  const trialEnd = thisTrialDays ? new Date() : undefined;
  if (trialEnd) trialEnd.setDate(new Date().getDate() + (thisTrialDays + 1));

  const session = await stripe.checkout.sessions.create({
    customer_email: validateEmail(email) ? email : undefined,
    line_items: [
      {
        price: priceId || process.env.STRIPE_DEFAULT_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    subscription_data: {
      trial_end: trialEnd,
    },
    success_url: successUrl || process.env.NEXTAUTH_URL,
    cancel_url: cancelUrl || process.env.NEXTAUTH_URL,
    after_expiration: {
      recovery: {
        enabled: true
      }
    }
  });

  return {
    redirect: session?.url ? {
      destination: session.url,
      permanent: false,
    } : undefined,
    props: {},
  };
}

export default HubspotFormSubmit;
