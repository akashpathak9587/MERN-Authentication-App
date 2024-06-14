import Login from "./components/Login";
import Signup from "./components/Signup";
import PasswordReset from "./components/PasswordReset";
import RequestSent from "./components/RequestSent";
import ChangePassword from "./components/ChangePassword";
import ResetSuccess from "./components/ResetSuccess";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<PasswordReset />} />
          <Route path="/request-sent" element={<RequestSent />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/reset-success" element={<ResetSuccess />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
