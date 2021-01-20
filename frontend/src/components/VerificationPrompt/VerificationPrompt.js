import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Button from "../Button";
import * as style from "./style";
import { RESEND_VERIFICATION } from "../../graph-ql/schema";
const VerificationPrompt = () => {
  const [verificationSent, setVerificationSent] = useState(false);
  const [resendVerification] = useMutation(RESEND_VERIFICATION, {
    onCompleted(data) {
      setVerificationSent(true);
    },
  });
  const handleClick = (e) => {
    e.preventDefault();
    resendVerification({});
  };
  return (
    <style.VerificationPrompt className="verificationPrompt">
      <style.VerificationText className="verificationPrompt__text">
        {verificationSent
          ? "We have sent you an email with a link to verify your email"
          : "You have not verified your email."}
      </style.VerificationText>
      <div onClick={handleClick}>
        <Button size="xsm">Resend Verification</Button>
      </div>
    </style.VerificationPrompt>
  );
};

export default VerificationPrompt;
