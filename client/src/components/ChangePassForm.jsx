import { Form, FormGroup, FormLabel } from "react-bootstrap";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import PasswordField from "./PasswordField";
import FormButton from "./FormButton";

function ChangePassForm({ isError, setIsError }) {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("id");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [cnfPassword, setCnfPassword] = useState("");
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !cnfPassword) {
      setIsError(true);
      return;
    }
    if (password !== cnfPassword) {
      setIsError(true);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/reset-password", {
        password,
        userId,
        token,
      });
      if (res.status === 200) {
        window.location.href = "/passwordUpdated";
      }
    } catch (error) {
      setIsError(true);
    }
  };
  return (
    <Form className="w-75 mt-3" autoComplete="off" onSubmit={handleSubmit}>
      <FormGroup className="mb-3 text-start form-group">
        <FormLabel
          className={isError ? "fw-400 text-danger" : "fw-400 c-091e42"}
        >
          Password
        </FormLabel>
        <PasswordField
          isError={isError}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </FormGroup>
      <FormGroup className="mb-3 text-start form-group">
        <FormLabel
          className={isError ? "fw-400 text-danger" : "fw-400 c-091e42"}
        >
          Confirm Password
        </FormLabel>
        <PasswordField
          isError={isError}
          password={cnfPassword}
          setPassword={setCnfPassword}
          showPassword={showCnfPassword}
          setShowPassword={setShowCnfPassword}
        />
      </FormGroup>
      <FormButton text="Update Password" />
    </Form>
  );
}

export default ChangePassForm;
