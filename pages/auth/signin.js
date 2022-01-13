import Head from 'next/head';
import { getCsrfToken } from 'next-auth/react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Layout from '../../layouts/main';

const SignIn = ({ csrfToken }) => {
  return (
    <>
      <Head>
        <title>The Coven Plan Manager - Sign In</title>
      </Head>
      <Layout>
        <Row className="justify-content-center mb-4">
          <Col sm="8" md="6" lg="5" xl="4">
            <p>Please enter the email address associated with your Coven subscription.</p>
            <p>A verification link will be sent to this address.</p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm="8" md="6" lg="5" xl="4" className="text-center">
            <Form method="post" action="/api/auth/signin/email">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <Form.Group className="mb-3">
                <Form.Label htmlFor="email" visuallyHidden={true}>Email address</Form.Label>
                <Form.Control name="email" id="email" type="email" placeholder="Email" />
              </Form.Group>
              
              <Button variant="primary" type="submit">Sign in with Email</Button>
            </Form>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}

export default SignIn;