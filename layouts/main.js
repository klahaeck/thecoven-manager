import { Container } from 'react-bootstrap';

const Main = ({ children }) => {
  return (
    <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
      <Container className="pt-3 pb-5">
        {/* <Row className="justify-content-center">
          <Col xs="10" md="6" lg="5" xl="4">
            <img src="https://images.squarespace-cdn.com/content/v1/5f1b16f93cbf1c1bb81a35ea/1596747152694-QHVKGBFOGJR4A7NFSI1W/FB_COVER_815x325P_%252Bbw_trans.png%3Fformat=1500w" alt="The Coven Logo" className="img-fluid" />
          </Col>
        </Row> */}
        {children}
      </Container>
    </div>
  );
};

export default Main;