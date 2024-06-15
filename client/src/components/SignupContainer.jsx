import { useState } from "react";
import GoogleLogin from "./GoogleLogin";
import FormLogo from "./FormLogo";
import ErrorContainer from "./ErrorContainer";
import FormTitle from "./FormTitle";
import Seprator from "./Seprator";
import SignupForm from "./SignupForm";
import SignupBottom from "./SignupBottom";

function SignupContainer() {
  const [isError, setIsError] = useState(false);
  return (
    <div className="w-75 d-flex flex-column justify-content-center align-items-center">
      <FormLogo />
      <ErrorContainer isError={isError} />
      <FormTitle
        title="Create an account"
        description="Join our platform to access over 10,000+ design assets!"
      />
      <GoogleLogin />
      <Seprator />
      <SignupForm isError={isError} setIsError={setIsError} />
      <SignupBottom />
    </div>
  );
}

export default SignupContainer;
