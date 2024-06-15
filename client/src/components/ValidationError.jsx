import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";

function ValidationError({message}) {
  return (
    <p className="text-danger fs-7 mt-1">
      <RiErrorWarningFill size={17} /> {message}
    </p>
  );
}

export default ValidationError;
