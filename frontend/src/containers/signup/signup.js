import React, { useEffect, useContext, useState } from "react";
import LoadSpinner from "../../components/LoadSpinner";
import SignupForm from "../../components/SignupForm/SignupForm";
import { store } from "../../store";
import * as style from "./style";

const Signup = () => {
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
    <style.Signup>
      <SignupForm></SignupForm>
    </style.Signup>
  );
};

export default Signup;
