import { RiErrorWarningFill } from "react-icons/ri";

function ErrorContainer({ isError, errorMessage }) {
  return (
    <div>
      {isError && (
        <div className="bg-faebfa text-danger px-4 py-2 rounded-pill fw-300 fs-6 mt-2 mb-4">
          <RiErrorWarningFill size={20} /> {errorMessage ? errorMessage : "Please check your inputs"}
        </div>
      )}
    </div>
  );
}

export default ErrorContainer;
