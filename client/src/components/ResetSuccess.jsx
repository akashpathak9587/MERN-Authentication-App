import { Col, Container, Row } from "react-bootstrap";

import Hero from "../assets/Sign-up/Hero.png";
import Logo from "../assets/Sign-up/Logo.png";
import { Link } from "react-router-dom";

function ResetSuccess() {
  return (
    <Container fluid className="vh-100">
      <Row className="vh-100">
        <Col className="p-0 d-xl-block d-none">
          <img
            src={Hero}
            alt="hero"
            className="img-fluid vh-100 w-100 object-fit-cover"
          />
        </Col>
        <Col className="d-flex flex-column text-center justify-content-center align-items-center">
          <div className="w-75 d-flex flex-column justify-content-center align-items-center">
            <div className="logo mb-4">
              <img src={Logo} alt="" />
            </div>
            <div className="title mb-2">
              <h2 className="mb-1 fw-500 c-091e42">
                Password updated <br /> successfully
              </h2>
              <p className="fs-6 fw-300 c-5d6b82">Go back & Login again</p>
            </div>

            <Link to="/" className="w-75 btn btn-primary rounded-4 p-3 fw-400">
              Go To Log in
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ResetSuccess;
