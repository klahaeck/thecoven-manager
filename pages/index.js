import Head from 'next/head';
import { Container } from 'react-bootstrap';

export default function Home() {
  return (
    <div>
      <Head>
        <title>The Coven Manager</title>
        <link rel="shortcut icon" type="image/x-icon" href="https://images.squarespace-cdn.com/content/v1/5f1b16f93cbf1c1bb81a35ea/1599854391052-4TJR334YEP5HNXT6XRG3/favicon.ico?format=100w"></link>
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
