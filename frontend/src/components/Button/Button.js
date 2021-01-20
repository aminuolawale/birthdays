import React from "react";
import StyledButton from "./style";

const Button = (props) => {
  return (
    <StyledButton type="submit" {...props}>
      {props.children}
    </StyledButton>
  );
};

export default Button;
