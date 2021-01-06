import React, { useEffect, useContext } from "react";
import SignupForm from "../components/SignupForm";
import { store } from "../store";

const Signup = () => {
  const { dispatch } = useContext(store);
  useEffect(() => {
    dispatch({ type: "LOGOUT_SUCCESS" });
  }, []);
  return (
    <div className="signup">
      <SignupForm></SignupForm>
    </div>
  );
};

export default Signup;
