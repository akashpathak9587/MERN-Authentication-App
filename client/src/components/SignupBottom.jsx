import { Link } from "react-router-dom";

function SignupBottom() {
  return (
    <div className="w-75 mt-3 c-5d6b82 fw-400">
      By agreeing to create an account with Nyinst, you agree to our{" "}
      <Link to="#" className="text-decoration-none">
        Terms
      </Link>{" "}
      and{" "}
      <Link to="#" className="text-decoration-none">
        Policy
      </Link>
      .
      <p className="mt-2 fs-6 fw-400 c-5d6b82">
        Already have an account?{" "}
        <Link to="/" className="text-decoration-none">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default SignupBottom;
