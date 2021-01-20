import React, { useEffect, useContext, useState } from "react";
import LoadSpinner from "../components/LoadSpinner";
import SignupForm from "../components/SignupForm";
import { store } from "../store";

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
    <div className="signup">
      <SignupForm></SignupForm>
    </div>
  );
};

export default Signup;
