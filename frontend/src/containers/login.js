import React, { useEffect, useContext } from "react";
import LoginForm from "../components/LoginForm";
import { store } from "../store";

const Login = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  useEffect(() => {
    dispatch({ type: "LOGOUT_SUCCESS" });
  }, []);
  return (
    <div className="login">
      <LoginForm></LoginForm>
    </div>
  );
};

export default Login;
