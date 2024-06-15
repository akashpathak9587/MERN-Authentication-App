import { useState } from "react";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import FormButton from "./FormButton";
import ValidationError from "./ValidationError";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetForm() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const navigate = useNavigate();
  const checkEmail = (email) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsValidEmail(checkEmail(email));
    if (!isValidEmail) return;
    axios.post("http://localhost:5001/forgot-password", {
      email,
    });
    navigate("/emailSent", { state: { email } });
  };

  return (
    <Form className="w-75 mt-3" autoComplete="off" onSubmit={handleSubmit}>
      <FormGroup className="mb-3 text-start form-group">
        <FormLabel
          className={!isValidEmail ? "fw-400 text-danger" : "fw-400 c-091e42"}
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
        {!isValidEmail && <ValidationError message="Enter valid email Id" />}
      </FormGroup>
      <FormButton text="Reset Password" />
    </Form>
  );
}

export default ResetForm;
