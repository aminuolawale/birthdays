import React from "react";
import * as style from "./style";

const PasswordToggler = ({ visible }) => {
  return (
    <style.PasswordToggler>
      {visible ? (
        <style.StyledEye size="20px"></style.StyledEye>
      ) : (
        <style.StyledEyeSlash size="20px"></style.StyledEyeSlash>
      )}
    </style.PasswordToggler>
  );
};

export default PasswordToggler;
