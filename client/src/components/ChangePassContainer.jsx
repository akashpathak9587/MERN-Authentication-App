import { useState } from "react";
import FormLogo from "./FormLogo";
import ErrorContainer from "./ErrorContainer";
import FormTitle from "./FormTitle";
import ChangePassForm from "./ChangePassForm";
import ChangePassBottom from "./ChangePassBottom";

function ChangePassContainer() {
  const [isError, setIsError] = useState(false);
  return (
    <div className="w-75 d-flex flex-column justify-content-center align-items-center">
      <FormLogo />
      <ErrorContainer
        isError={isError}
        errorMessage="Password didn’t match! Try again"
      />
      <FormTitle title="Change Password" />
      <ChangePassForm isError={isError} setIsError={setIsError} />
      <ChangePassBottom />
    </div>
  );
}

export default ChangePassContainer;
