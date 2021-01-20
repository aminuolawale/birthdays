import styled from "styled-components";
import { styling } from "../constants";

export const Form = styled.form`
  width: 400px;
  margin: auto;
  background: ${styling.MAIN_WHITE};
  padding: 40px;
  border-radius: 20px;
  color: ${styling.MAIN_DARK};
`;

export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

export const FormErrors = styled.div`
  height: 30px;
  color: ${styling.MAIN_ERROR};
  font-size: ${styling.SM_FONT};
  text-align: center;
`;

export const FormBody = styled.div`
  position: relative;
`;

export const FormFieldGroup = styled.div`
  font-size: ${styling.XSM_FONT};
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  & > label {
    margin-bottom: 5px;
  }
  & > input {
    font-size: inherit;
    padding: 10px;
    border-radius: 7.5px;
    border: 2px solid ${styling.MAIN_GRAY};
    &:focus {
      border: 2px solid rgba(${styling.MAIN_WINE}, 0.7);
      outline: none;
    }
  }
`;

export const FormButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
