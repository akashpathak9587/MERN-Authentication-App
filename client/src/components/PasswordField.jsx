import { FormControl } from "react-bootstrap";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

function PasswordField({
  isError,
  password,
  setPassword,
  showPassword,
  setShowPassword,
}) {
  return (
    <div className="position-relative">
      <FormControl
        className={isError ? "rounded-4 p-3 border-danger" : "rounded-4 p-3"}
        type={`${showPassword ? "text" : "password"}`}
        placeholder="Enter Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="position-absolute show-password fs-3 pt-3 top-0 end-0 pe-3 d-flex justify-content-end align-items-center">
        {showPassword ? (
          <RiEyeOffLine onClick={() => setShowPassword(!showPassword)} />
        ) : (
          <RiEyeLine onClick={() => setShowPassword(!showPassword)} />
        )}
      </div>
    </div>
  );
}

export default PasswordField;
