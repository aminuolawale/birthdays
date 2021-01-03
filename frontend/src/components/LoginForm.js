import React, { useState, useEffect } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graph-ql/schema";
import { Redirect } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { authUserVar } from "../cache";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  useEffect(() => {
    document.getElementById("password").type = "password";
    setPasswordVisibility(false);
    authUserVar({
      loggedIn: false,
      userThumb: null,
      verified: null,
    });
  }, []);

  const [login] = useMutation(LOGIN, {
    onCompleted(data) {
      const result = data.tokenAuth;
      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("userThumb", result.result.avatar);
        localStorage.setItem("verified", result.result.verified);
        setSuccess(true);
        authUserVar({
          loggedIn: true,
          userThumb: result.result.avatar,
          verified: result.result.verified,
        });
      }
    },
  });

  const onSubmit = async (payload) => {
    console.log("the payload >>>>>>>>>>>>>>>>>>>>>>>>>.", payload);
    try {
      await login({ variables: payload });
    } catch (err) {
      setErrors([{ message: "Incorrect email or password" }]);
    }
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
    return <Redirect to="/account"></Redirect>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form__header">
        <h2 className="form__header__title">
          Login to <span className="mainHighlight">Birthdays</span>
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
            ref={register}
          ></input>
          <div
            className="form__body__passwordToggler"
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
            Login
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
