import FormTitle from "../components/FormTitle";
import ResetForm from "../components/ResetForm";
import ResetBottom from "./ResetBottom";
import FormLogo from "../components/FormLogo";

function ResetContainer() {
  return (
    <div className="w-75 d-flex flex-column justify-content-center align-items-center">
      <FormLogo />
      <FormTitle title="Request Password Reset by <br/> entering your email" />
      <ResetForm />
      <ResetBottom/>
    </div>
  );
}

export default ResetContainer;
