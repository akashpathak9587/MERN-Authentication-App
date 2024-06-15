import { Col, Container, Row } from "react-bootstrap";
import ImgCol from "../components/ImgCol";
import ChangePassContainer from "../components/ChangePassContainer";

function ChangePassword() {
  return (
    <Container fluid className="vh-100">
      <Row className="vh-100">
        <Col className="p-0 d-xl-block d-none">
          <ImgCol />
        </Col>
        <Col className="d-flex flex-column text-center justify-content-center align-items-center">
          <ChangePassContainer />
        </Col>
      </Row>
    </Container>
  );
}

export default ChangePassword;
