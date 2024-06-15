import { useState } from "react";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { RiErrorWarningFill, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PasswordField from "./PasswordField";
import ValidationError from "./ValidationError";
import FormButton from "./FormButton";

function SignupForm({ isError, setIsError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const navigate = useNavigate();

  const checkEmail = (email) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  };

  const checkPassword = (password) => {
    // Example password check (at least 8 characters)
    return password.length >= 8;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    let valid = true;

    if (!email || !checkEmail(email)) {
      setIsValidEmail(false);
      valid = false;
    } else {
      setIsValidEmail(true);
    }

    if (!password || !checkPassword(password)) {
      setIsValidPassword(false);
      valid = false;
    } else {
      setIsValidPassword(true);
    }

    if (!valid) {
      setIsError(true);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/signup", {
        email,
        password,
      });
      if (res.status === 201) {
        navigate("/");
      } else {
        setIsError(true);
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
  };
  return (
    <Form className="w-75 mt-3" autoComplete="off" onSubmit={handleSubmit}>
      <FormGroup className="mb-3 text-start form-group">
        <FormLabel
          className={
            isError && !isValidEmail ? "fw-400 text-danger" : "fw-400 c-091e42"
          }
        >
          Email
        </FormLabel>
        <FormControl
          className={
            isError && !isValidEmail
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
          <ValidationError message="Please enter a valid email" />
        )}
      </FormGroup>
      <FormGroup className="mb-3 text-start form-group">
        <FormLabel
          className={
            isError && !isValidPassword
              ? "fw-400 text-danger"
              : "fw-400 c-091e42"
          }
        >
          Password
        </FormLabel>
        <PasswordField isError={isError} password={password} setPassword={setPassword} showPassword={showPassword} setShowPassword={setShowPassword} />
        {!isValidPassword && (
          <ValidationError message="Password must be at least 8 characters" />
        )}
      </FormGroup>
      <FormButton text="Create an account" />
    </Form>
  );
}

export default SignupForm;
