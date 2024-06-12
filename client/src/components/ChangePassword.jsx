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
import { Link } from "react-router-dom";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [cnfPassword, setCnfPassword] = useState("");
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password: " + password + " Confirm Password: " + cnfPassword);
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
                <RiErrorWarningFill size={20} /> Password didn’t match! Try
                again
              </div>
            )}
            <div className="title mb-2">
              <h2 className="mb-1 fw-500 c-091e42">Change Password</h2>
            </div>
            <Form
              className="w-75 mt-3"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
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
              <FormGroup className="mb-3 text-start form-group">
                <FormLabel
                  className={isError ? "fw-400 text-danger" : "fw-400 c-091e42"}
                >
                  Confirm Password
                </FormLabel>
                <div className="position-relative">
                  <FormControl
                    className={
                      isError ? "rounded-4 p-3 border-danger" : "rounded-4 p-3"
                    }
                    type={`${showCnfPassword ? "text" : "password"}`}
                    placeholder="Enter Your Confirm Password"
                    value={cnfPassword}
                    onChange={(e) => setCnfPassword(e.target.value)}
                  />
                  <div className="position-absolute show-password fs-3 pt-3 top-0 end-0 pe-3  d-flex justify-content-end align-items-center">
                    {showCnfPassword ? (
                      <RiEyeOffLine
                        onClick={() => setShowCnfPassword(!showCnfPassword)}
                      />
                    ) : (
                      <RiEyeLine
                        onClick={() => setShowCnfPassword(!showCnfPassword)}
                      />
                    )}
                  </div>
                </div>
              </FormGroup>
              <button
                className="w-100 btn btn-primary rounded-4 p-3 fw-400"
                type="submit"
              >
                Update Password
              </button>
            </Form>
            <div className="w-75 mt-3">
              <Link to="/forgot" className="text-decoration-none fw-light">
                Back To Log in
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ChangePassword;
