import React, { useEffect, useContext, useState } from "react";
import LoadSpinner from "../../components/LoadSpinner";
import LoginForm from "../../components/LoginForm";
import { store } from "../../store";
import * as style from "./style";

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
    <style.Login>
      <LoginForm></LoginForm>
    </style.Login>
  );
};

export default Login;
