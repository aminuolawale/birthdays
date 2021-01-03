import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { authUserVar } from "../cache";

const Login = () => {
  useEffect(() => {
    localStorage.setItem("token", "");
    localStorage.setItem("userThumb", "");
    localStorage.setItem("verified", "");
    authUserVar({
      loggedIn: false,
      userThumb: "",
      verified: "",
    });
  }, []);
  return (
    <div className="login">
      <LoginForm></LoginForm>
    </div>
  );
};

export default Login;
