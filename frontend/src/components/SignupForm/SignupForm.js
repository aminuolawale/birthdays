import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "../../graph-ql/schema";
import { Redirect } from "react-router-dom";
import PasswordToggler from "../PasswordToggler";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import * as style from "./style";

const SignupForm = () => {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  useEffect(() => {
    document.getElementById("password").type = "password";
    setPasswordVisibility(false);
  }, []);

  const [signup] = useMutation(SIGNUP, {
    onCompleted(data) {
      const result = data.createUser;
      if (result.ok) {
        setSuccess(true);
      } else {
        setErrors(result.errors);
      }
    },
  });
  const onSubmit = (payload) => {
    signup({ variables: payload });
  };
  const togglePasswordVisibility = () => {
    const x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
      setPasswordVisibility(true);
    } else {
      x.type = "password";
      setPasswordVisibility(false);
    }
  };
  if (success) {
    return <Redirect to="/login"></Redirect>;
  }
  return (
    <style.SignupForm onSubmit={handleSubmit(onSubmit)}>
      <style.SignupFormHeader>
        <h2>
          Welcome to <span className="mainHighlight">Birthdays</span>
        </h2>
      </style.SignupFormHeader>
      <style.SignupFormErrors>
        {errors.map((error) => (
          <p key={error}>{error.message}</p>
        ))}
      </style.SignupFormErrors>
      <style.SignupFormBody>
        <style.SignupFormFieldGroup>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            required
            ref={register}
          ></input>
        </style.SignupFormFieldGroup>
        <style.SignupFormFieldGroup>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder=""
            required
            ref={register}
          ></input>
        </style.SignupFormFieldGroup>
        <style.SignupFormFieldGroup>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder=""
            required
            ref={register}
          ></input>
        </style.SignupFormFieldGroup>
        <style.SignupFormFieldGroup>
          <label htmlFor="email">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder=""
            required
            ref={register}
          ></input>
          <style.TogglerContainer onClick={togglePasswordVisibility}>
            <PasswordToggler
              signup={true}
              visible={passwordVisibility}
            ></PasswordToggler>
          </style.TogglerContainer>
        </style.SignupFormFieldGroup>

        <style.SignupFormButton>
          <Button size="sm" expand={true}>
            Signup
          </Button>
        </style.SignupFormButton>
      </style.SignupFormBody>
    </style.SignupForm>
  );
};

export default SignupForm;
