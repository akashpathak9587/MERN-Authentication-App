import Logo from "../assets/Sign-up/Logo.png";
import { Link } from "react-router-dom";
import FormLogo from "./FormLogo";
import FormTitle from "./FormTitle";
import RequestSentLink from "./RequestSentLink";

function ResetSuccessContainer() {
  return (
    <div className="w-75 d-flex flex-column justify-content-center align-items-center">
      <FormLogo />
      <FormTitle
        title="Password updated <br /> successfully"
        description="Go back & Login again"
      />
      <RequestSentLink />
    </div>
  );
}

export default ResetSuccessContainer;
