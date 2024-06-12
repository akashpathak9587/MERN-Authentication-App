import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { RiErrorWarningFill } from "react-icons/ri";
import Hero from "../assets/Sign-up/Hero.png";
import Logo from "../assets/Sign-up/Logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const checkEmail = (email) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Email: " + email);
  };
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
                Request password reset by <br />
                entering your email
              </h2>
            </div>
            <Form
              className="w-75 mt-3"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <FormGroup className="mb-3 text-start form-group">
                <FormLabel
                  className={
                    !isValidEmail ? "fw-400 text-danger" : "fw-400 c-091e42"
                  }
                >
                  Email
                </FormLabel>
                <FormControl
                  className={
                    !isValidEmail
                      ? "rounded-4 p-3 border-danger c-091e42"
                      : "rounded-4 p-3 c-091e42"
                  }
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setIsValidEmail(checkEmail(email))}
                />
                {!isValidEmail && (
                  <p className="text-danger fs-7 mt-1">
                    <RiErrorWarningFill size={17} /> Enter valid email Id
                  </p>
                )}
              </FormGroup>
              <button
                className="w-100 btn btn-primary rounded-4 p-3 fw-400"
                type="submit"
              >
                Reset Password
              </button>
            </Form>
            <div className="w-75 mt-3 c-5d6b82 fw-400">
              <Link to="#" className="text-decoration-none">
                Go Back
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordReset;
