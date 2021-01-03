import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { VERIFY_USER } from "../graph-ql/schema";

const VerifyAccount = (props) => {
  const token = props.match.params.token;
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [verifyUser] = useMutation(VERIFY_USER, {
    onCompleted(data) {
      const result = data.verifyUser;
      if (result.ok) {
        setSuccess(true);
      } else {
        setErrors(result.errors);
      }
    },
  });
  useEffect(() => {
    verifyUser({ variables: { token: token } });
  }, []);
  if (success) {
    return <Redirect to="/login"></Redirect>;
  }
  return <div> Please wait while we verify your account</div>;
};

export default VerifyAccount;
