import React from "react";

function FormButton({ text }) {
  return (
    <button
      className="w-100 btn btn-primary rounded-4 p-3 fw-400"
      type="submit"
    >
      {text}
    </button>
  );
}

export default FormButton;
