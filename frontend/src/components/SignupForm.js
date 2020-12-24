import React from "react";
import Button from "./Button";

const SignupForm = () => {
  return (
    <div>
      <form className="form">
        <div className="form__fieldGroup">
          <label htmlFor="email">Email</label>
          <input
            id="password"
            type="email"
            placeholder="example@email.com"
          ></input>
        </div>
        <div className="form__fieldGroup">
          <label htmlFor="firstName">First Name</label>
          <input id="password" type="text" placeholder=""></input>
        </div>
        <div className="form__fieldGroup">
          <label htmlFor="lastName">Last Name</label>
          <input id="password" type="text" placeholder=""></input>
        </div>
        <div className="form__fieldGroup">
          <label htmlFor="email">Password</label>
          <input id="password" type="password" placeholder=""></input>
        </div>
        <div className="form__button">
          <Button size="md">Signup</Button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
