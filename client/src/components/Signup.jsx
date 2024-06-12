import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { RiErrorWarningFill, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import Hero from "../assets/Sign-up/Hero.png";
import Logo from "../assets/Sign-up/Logo.png";
import Google from "../assets/Sign-up/Google.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isError, setIsError] = useState(false);
  const checkEmail = (email) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Email: " + email + " Password: " + password);
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
            {isError && (
              <div
                className="bg-faebfa text-danger px-4 py-2 rounded-pill fw-300 fs-6 mt-2 mb-4"
                role="alert"
              >
                {" "}
                <RiErrorWarningFill size={20} /> Incorrect Email
              </div>
            )}
            <div className="title mb-2">
              <h2 className="mb-1 fw-500 c-091e42">Create an account</h2>
              <p className="fs-6 fw-300 c-5d6b82">
                Join our platform to access over 10,000+ design assets!!
              </p>
            </div>
            <div className="google-login d-flex justify-content-center align-items-center bd-b3b9c4 w-75 p-3 rounded-4 gap-2">
              <div className="logo">
                <img src={Google} alt="" />
              </div>
              Continue With Google
            </div>
            <div className="liner w-75 d-flex justify-content-between align-items-center gap-2 mt-3">
              <div className="line w-50 h-1 bg-dfe2e6 "></div>
              or
              <div className="line w-50 h-1 bg-dfe2e6"></div>
            </div>
            <Form
              className="w-75 mt-3"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <FormGroup className="mb-3 text-start form-group">
                <FormLabel
                  className={
                    isError || !isValidEmail
                      ? "fw-400 text-danger"
                      : "fw-400 c-091e42"
                  }
                >
                  Email
                </FormLabel>
                <FormControl
                  className={
                    isError || !isValidEmail
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
              <FormGroup className="mb-3 text-start form-group">
                <FormLabel className="fw-400 c-091e42">Password</FormLabel>
                <div className="position-relative">
                  <FormControl
                    className="rounded-4 p-3"
                    type={`${showPassword ? "text" : "password"}`}
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="position-absolute show-password fs-3 pt-3 top-0 end-0 pe-3  d-flex justify-content-end align-items-center">
                    {showPassword ? (
                      <RiEyeOffLine
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <RiEyeLine
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </div>
                </div>
              </FormGroup>
              <button
                className="w-100 btn btn-primary rounded-4 p-3 fw-400"
                type="submit"
              >
                Create an account
              </button>
            </Form>
            <div className="w-75 mt-3 c-5d6b82 fw-400">
              By agreeing to create an account with Nyinst, you agree to our{" "}
              <Link to="#" className="text-decoration-none">
                Terms
              </Link>
              {" and "}
              <Link to="#" className="text-decoration-none">
                Policy.
              </Link>
              <p className="mt-2 fs-6 fw-400 c-5d6b82">
                Already have an account{" "}
                <Link to="/" className="text-decoration-none">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
