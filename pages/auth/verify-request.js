import Head from 'next/head';
import { Row, Col } from 'react-bootstrap';
import Layout from '../../layouts/main';

const VerifyRequest = () => {
  return (
    <>
      <Head>
        <title>The Coven Plan Manager - Verify Request</title>
      </Head>
      <Layout>
        <Row className="justify-content-center text-center">
          <Col>
            <h1 className="h3">Check your email</h1>
            <p className="fs-5">A sign in link has been sent to your email address.</p>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default VerifyRequest;