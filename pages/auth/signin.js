import Head from 'next/head';
import { useRouter } from 'next/router';
import { getCsrfToken } from 'next-auth/react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Layout from '../../layouts/main';
import { useForm, Controller } from 'react-hook-form';

const SignIn = ({ csrfToken }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = data => {
    fetch('/api/auth/signin/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => router.push(response.url))
      .catch(error => console.error(error))
  }

  return (
    <>
      <Head>
        <title>The Coven Plan Manager - Sign In</title>
      </Head>

      <Layout>
        <Row className="justify-content-center mb-5">
          <Col className="text-center">
            <img src="/images/plane-flying.svg" alt="paper airplane flying" className="img-fluid" width="120" />
          </Col>
        </Row>

        <Row className="justify-content-center mb-4">
          <Col xs="11" sm="8" md="6" lg="5" xl="4" className="text-center">
            <p>Please enter the email address associated with your Coven subscription.</p>
            <p>A verification link will be sent to this address.</p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs="11" sm="8" md="6" lg="5" xl="4" className="text-center">
            <Form method="post" action="/api/auth/signin/email" onSubmit={handleSubmit(onSubmit)}>
              <input defaultValue={csrfToken} type="hidden" {...register("csrfToken")} />
              <Controller
                name="email"
                control={control}
                // disabled={isSubmitting}
                rules={{
                  required: true,
                  pattern : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                }}
                render={({ field }) => <Form.Group className="mb-5">
                <Form.Label htmlFor="email" visuallyHidden={true}>Email address</Form.Label>
                <Form.Control {...field} />
                {errors.email?.type === 'required' && <Form.Text className="text-danger">
                  Email is required
                </Form.Text>}
                {errors.email?.type === 'pattern' && <Form.Text className="text-danger">
                  Please enter a valid email address
                </Form.Text>}
              </Form.Group>}
              />              
              
              <Button variant="outline-light" type="submit" className="border-3">Sign in with Email</Button>
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