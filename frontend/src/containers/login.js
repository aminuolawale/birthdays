import React, { useEffect, useContext, useState } from "react";
import LoadSpinner from "../components/LoadSpinner";
import LoginForm from "../components/LoginForm";
import { store } from "../store";

const Login = () => {
  const { dispatch } = useContext(store);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch({ type: "LOGOUT_SUCCESS" });
    setLoading(false);
  }, []);
  if (loading) {
    return <LoadSpinner></LoadSpinner>;
  }
  return (
    <div className="login">
      <LoginForm></LoginForm>
    </div>
  );
};

export default Login;
