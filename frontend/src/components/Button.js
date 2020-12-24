import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <span className={`button button--${props.size}`}>{props.children}</span>
  );
};

export default Button;
