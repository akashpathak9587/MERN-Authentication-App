import { Link } from "react-router-dom";

function LoginBottom() {
  return (
    <div className="w-75 mt-3">
      <Link to="/forgot" className="text-decoration-none">
        Forgot Password?
      </Link>
      <p className="mt-2 fs-6 c-5d6b82">
        {"Don't"} have an account?{" "}
        <Link to="/signup" className="text-decoration-none">
          Create One
        </Link>
      </p>
    </div>
  );
}

export default LoginBottom;
