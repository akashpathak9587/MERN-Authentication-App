import { useState } from "react";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import ValidationError from "./ValidationError";
import FormButton from "./FormButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PasswordField from "./PasswordField";

function LoginForm({ isError, setIsError, setErrorMessage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const navigate = useNavigate();
  const checkEmail = (email) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  };
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
    <Form className="w-75 mt-3" autoComplete="off" onSubmit={handleSubmit}>
      <FormGroup className="mb-3 text-start form-group">
        <FormLabel
          className={
            isError || !isValidEmail ? "fw-400 text-danger" : "fw-400 c-091e42"
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
          <ValidationError message="Enter valid email Id" />
        )}
      </FormGroup>
      <FormGroup className="mb-3 text-start form-group">
        <FormLabel
          className={isError ? "fw-400 text-danger" : "fw-400 c-091e42"}
        >
          Password
        </FormLabel>
        <PasswordField isError={isError} password={password} setPassword={setPassword} showPassword={showPassword} setShowPassword={setShowPassword} />
      </FormGroup>
      <FormButton text="Log in" />
    </Form>
  );
}

export default LoginForm;
