import FormLogo from "./FormLogo";
import GoogleLogin from "./GoogleLogin";
import LoginForm from "./LoginForm";
import FormTitle from "./FormTitle";
import { useState } from "react";
import ErrorContainer from "./ErrorContainer";
import Seprator from "./Seprator";
import LoginBottom from "./LoginBottom";

function LoginContainer() {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="w-75 d-flex flex-column justify-content-center align-items-center">
      <FormLogo isError={isError} errorMessage={errorMessage} />
      <ErrorContainer isError={isError} errorMessage={errorMessage} />
      <FormTitle
        title="Sign in to your account"
        description="Explore more design assets of your choice"
      />
      <GoogleLogin />
      <Seprator />
      <LoginForm
        isError={isError}
        errorMessage={errorMessage}
        setIsError={setIsError}
        setErrorMessage={setErrorMessage}
      />
      <LoginBottom />
    </div>
  );
}

export default LoginContainer;
