import React, { useState, useEffect } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "../graph-ql/schema";
import { Redirect } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

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
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form__header">
        <h2 className="form__header__title">
          Welcome to <span className="mainHighlight">Birthdays</span>
        </h2>
      </div>
      <div className="form__errors">
        {errors.map((error) => (
          <p key={error} className="form__errors__item">
            {error.message}
          </p>
        ))}
      </div>
      <div className="form__body">
        <div className="form__body__fieldGroup">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            required
            ref={register}
          ></input>
        </div>
        <div className="form__body__fieldGroup">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder=""
            required
            ref={register}
          ></input>
        </div>
        <div className="form__body__fieldGroup">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder=""
            required
            ref={register}
          ></input>
        </div>
        <div className="form__body__fieldGroup">
          <label htmlFor="email">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder=""
            required
            ref={register}
          ></input>
          <div
            className="form__body__passwordToggler form__body__passwordToggler--signup"
            onClick={togglePasswordVisibility}
          >
            {passwordVisibility ? (
              <FaRegEye
                className="form__body__passwordToggler__icon"
                size="20px"
              ></FaRegEye>
            ) : (
              <FaRegEyeSlash
                className="form__body__passwordToggler__icon"
                size="20px"
              ></FaRegEyeSlash>
            )}
          </div>
        </div>

        <div className="form__body__button">
          <Button size="sm" expand={true}>
            Signup
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
