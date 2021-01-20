import styled, { css } from "styled-components";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export const PasswordToggler = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
export const StyledEye = styled(FaRegEye)`
  opacity: 0.5;
`;

export const StyledEyeSlash = styled(FaRegEyeSlash)`
  opacity: 0.5;
`;
