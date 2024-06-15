import Google from "../assets/Sign-up/Google.png";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GoogleLogin() {
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google login successful", tokenResponse);

      // Send authorization code to backend
      try {
        const response = await axios.post(
          "http://localhost:5001/api/google-login",
          {
            code: tokenResponse.code,
          }
        );

        if (response.status === 200) {
          console.log("Backend login successful", response.user);
          // Save user data or token in localStorage/sessionStorage if needed
          // localStorage.setItem('user', JSON.stringify(response.user));
          navigate("/dashboard");
        } else {
          console.error("Backend login failed", response.data);
          // Handle backend login failure here
        }
      } catch (error) {
        console.error("Error during backend login", error);
        // Handle communication error here
      }
    },
    onError: () => {
      console.error("Google login failed");
    },
    flow: "auth-code",
  });
  
  return (
    <div
      className="google-login d-flex justify-content-center align-items-center bd-b3b9c4 w-75 p-3 rounded-4 gap-2 cursor-pointer"
      onClick={() => googleLogin()}
    >
      <div className="logo">
        <img src={Google} alt="" />
      </div>
      Continue With Google
    </div>
  );
}

export default GoogleLogin;
