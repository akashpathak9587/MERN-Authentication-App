import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RequestSent from "./components/RequestSent";
import ChangePassword from "./components/ChangePassword";
import ResetSuccess from "./components/ResetSuccess";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/emailSent" element={<RequestSent />} />
          <Route path="/resetPassword" element={<ChangePassword />} />
          <Route path="/passwordUpdated" element={<ResetSuccess />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
