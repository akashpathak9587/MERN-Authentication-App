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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Function to validate email format
  const checkEmail = (email) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error state
    setIsError(false);
    setErrorMessage("");

    // Basic validation
    if (!email || !password) {
      setIsError(true);
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if (!checkEmail(email)) {
      setIsValidEmail(false);
      setErrorMessage("Invalid email format.");
      return;
    }

    // API call to login endpoint
    try {
      const response = await axios.post("http://localhost:5001/login", {
        email,
        password,
      });
      if (response.status === 200) {
        navigate("/dashboard"); // Redirect to homepage or dashboard on successful login
      }
    } catch (error) {
      setIsError(true);
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
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
                <RiErrorWarningFill size={20} /> {errorMessage}
              </div>
            )}
            <div className="title mb-2">
              <h2 className="mb-1 fw-500 c-091e42">Sign in to your account</h2>
              <p className="fs-6 fw-300 c-5d6b82">
                Explore more design assets of your choice
              </p>
            </div>
            <GoogleLogin />
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
                <FormLabel
                  className={isError ? "fw-400 text-danger" : "fw-400 c-091e42"}
                >
                  Password
                </FormLabel>
                <div className="position-relative">
                  <FormControl
                    className={
                      isError ? "rounded-4 p-3 border-danger" : "rounded-4 p-3"
                    }
                    type={`${showPassword ? "text" : "password"}`}
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="position-absolute show-password fs-3 pt-3 top-0 end-0 pe-3 d-flex justify-content-end align-items-center">
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
                Log in
              </button>
            </Form>
            <div className="w-75 mt-3">
              <Link to="/forgot" className="text-decoration-none fw-light">
                Forgot Password?
              </Link>
              <p className="mt-2 fs-6 fw-300 c-5d6b82">
                {"Don't"} have an account?{" "}
                <Link to="/signup" className="text-decoration-none fw-light">
                  Create One
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
