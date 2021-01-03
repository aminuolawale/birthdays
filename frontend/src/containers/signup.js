import React, { useEffect } from "react";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  useEffect(() => {
    localStorage.setItem("token", "");
  }, []);
  return (
    <div className="signup">
      <SignupForm></SignupForm>
    </div>
  );
};

export default Signup;
