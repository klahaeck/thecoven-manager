import Head from 'next/head';
import { getSession, useSession } from "next-auth/react";
const stripe = require('stripe')(process.env.STRIPE_API_SECRET);

export default function Portal() {
  const { data: session } = useSession();

  return (
    <div>
      <Head>
        <title>The Coven Manager - Portal</title>
      </Head>

      <main>
        <p>There is no customer record for {session.user.email}</p>
      </main>
    </div>
  )
}

Portal.auth = true;

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
