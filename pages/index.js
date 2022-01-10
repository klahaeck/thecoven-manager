import Head from 'next/head';
import { Container } from 'react-bootstrap';

export default function Home() {
  return (
    <div>
      <Head>
        <title>The Coven Manager</title>
        {/* <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Container className="mt-5">
        <h1>
          You will be redirected to <a href="https://community.thecoven.com/feed">The Coven community feed</a>
        </h1>
      </Container>

      {/* <footer></footer> */}
    </div>
  )
}
