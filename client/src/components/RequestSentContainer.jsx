import { useLocation } from "react-router-dom";
import FormLogo from "./FormLogo";
import RequestSentMessage from "./RequestSentMessage";
import RequestSentLink from "./RequestSentLink";

function RequestSentContainer() {
  const { state } = useLocation();

  return (
    <div className="w-75 d-flex flex-column justify-content-center align-items-center">
      <FormLogo />
      <RequestSentMessage email={state.email} />
      <RequestSentLink />
    </div>
  );
}

export default RequestSentContainer;
