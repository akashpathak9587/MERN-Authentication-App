import Login from "./components/Login";
import Signup from "./components/Signup";
import PasswordReset from "./components/PasswordReset";
import RequestSent from "./components/RequestSent";
import ChangePassword from "./components/ChangePassword";
import ResetSuccess from "./components/ResetSuccess";

const App = () => {
  return (
    <>
      <Login />
      <Signup />
      <PasswordReset />
      <RequestSent />
      <ChangePassword />
      <ResetSuccess />
    </>
  );
};

export default App;
