import React from "react";

const Button = (props) => {
  return (
    <button
      type="submit"
      className={`button button--${props.size} ${
        props.expand ? "button--expand" : ""
      }`}
    >
      {props.children}
    </button>
  );
};

export default Button;
