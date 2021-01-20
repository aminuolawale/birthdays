import React, { useState, useEffect, useContext } from "react";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graph-ql/schema";
import { useHistory } from "react-router-dom";
import { store } from "../../store";
import PasswordToggler from "../PasswordToggler";
import * as style from "./style";

const LoginForm = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const history = useHistory();

  useEffect(() => {
    document.getElementById("password").type = "password";
    setPasswordVisibility(false);
  }, []);

  const [login] = useMutation(LOGIN, {
    onCompleted(data) {
      const result = data.tokenAuth;
      if (result.token) {
        const loginData = {
          userThumb: result.result.avatar,
          verified: result.result.verified,
          token: result.token,
        };
        dispatch({ type: "LOGIN_SUCCESS", data: loginData });
        history.push("/");
      }
    },
  });

  const onSubmit = async (payload) => {
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
  return (
    <style.LoginForm duration=".5" onSubmit={handleSubmit(onSubmit)}>
      <style.LoginFormHeader>
        <h2>
          Login to <span className="mainHighlight">Birthdays</span>
        </h2>
      </style.LoginFormHeader>
      <style.LoginFormErrors>
        {errors.map((error) => (
          <p key={error}>{error.message}</p>
        ))}
      </style.LoginFormErrors>
      <style.LoginFormBody>
        <style.LoginFormFieldGroup>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            ref={register}
          ></input>
        </style.LoginFormFieldGroup>
        <style.LoginFormFieldGroup>
          <label htmlFor="email">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder=""
            ref={register}
          ></input>
          <style.TogglerContainer onClick={togglePasswordVisibility}>
            <PasswordToggler visible={passwordVisibility}></PasswordToggler>
          </style.TogglerContainer>
        </style.LoginFormFieldGroup>
        <style.LoginFormButton>
          <Button size="sm" expand={true}>
            Login
          </Button>
        </style.LoginFormButton>
      </style.LoginFormBody>
    </style.LoginForm>
  );
};

export default LoginForm;
