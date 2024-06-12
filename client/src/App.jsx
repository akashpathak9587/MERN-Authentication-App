import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { RiErrorWarningFill, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import Hero from "./assets/Sign-up/Hero.png";
import Logo from "./assets/Sign-up/Logo.png";
import Google from "./assets/Sign-up/Google.png";
import { useState } from "react";
import { Link } from "react-router-dom";
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
