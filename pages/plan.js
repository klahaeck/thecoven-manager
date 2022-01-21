import Head from 'next/head';
import Link from 'next/link';
import { getSession, useSession } from "next-auth/react";
const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
import Layout from '../layouts/main';
import { Row, Col, Button } from 'react-bootstrap';

const Plan = () => {
  const { data: session } = useSession();

  return (
    <div>
      <Head>
        <title>The Coven Plan Manager - My Plan</title>
      </Head>

      <Layout>
        <Row className="justify-content-center mb-5">
          <Col className="text-center">
            <img src="/images/plane-burning.svg" alt="paper airplane burning" className="img-fluid" width="80" />
          </Col>
        </Row>

        <h1 className="h3 text-center sofia-pro-bold">Shoot!</h1>
        <p className="text-center mb-5">There is no customer with the address<br /><strong>{session.user.email}</strong></p>

        <div className="text-center">
          <Link href={`/auth/signin?callbackUrl=${window.location.href}`} passHref>
            <Button variant="outline-light" className="border-3">Try again with a different address</Button>
          </Link>
        </div>
      </Layout>
    </div>
  )
}

Plan.auth = true;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  const customers = session?.user?.email ? await stripe.customers.list({
    // email: 'elmauter@gmail.com', // FOR TESTING
    email: session.user.email,
    limit: 1,
  }) : undefined;
    
  const stripeSession = customers && customers.data.length > 0 ? await stripe.billingPortal.sessions.create({
    customer: customers.data[0].id,
    return_url: 'https://community.thecoven.com/feed',
  }) : undefined;

  return {
    redirect: stripeSession?.url ? {
      destination: stripeSession.url,
      permanent: false,
    } : undefined,
    props: {},
  };
}

export default Plan;
