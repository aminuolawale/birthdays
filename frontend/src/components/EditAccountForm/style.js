import styled, { css } from "styled-components";
import { styling } from "../../constants";

export const EditAccountForm = styled.form`
  background: ${styling.MAIN_WHITE};
  width: 760px;
  margin: auto;
  background: ${styling.MAIN_WHITE};
  padding: 40px;
  border-radius: 20px;
  color: ${styling.MAIN_DARK};
`;

export const EditAccountFormHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

export const EditAccountFormBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const EditAccountImageContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const EditAccountImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  &:hover {
    cursor: pointer;
    -webkit-filter: brightness(80%);
  }
`;

export const EditAccountImageInput = styled.div`
  margin-top: 40px;
  & > img {
    height: 64px;
  }
  & > input {
    font-size: inherit;
    padding: 10px;
    border-radius: 7.5px;
    border: 2px solid ${styling.MAIN_GRAY};
    width: 200px;
    &:focus {
      border: 2px solid rgba(${styling.MAIN_WINE}, 0.7);
      outline: none;
    }
    display: none;
  }
`;
export const EditAccountFormFields = styled.div`
  width: 100%;
`;

export const EditAccountFormGroup = styled.div`
  font-size: ${styling.XSM_FONT};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin-bottom: 30px;
  ${(props) =>
    props.block &&
    css`
      display: block;
    `}
  & > label {
    margin-bottom: 5px;
  }
  & > input {
    font-size: inherit;
    padding: 10px;
    border-radius: 7.5px;
    border: 2px solid ${styling.MAIN_GRAY};
    width: 210px;
    &:focus {
      border: 2px solid rgba(${styling.MAIN_WINE}, 0.7);
      outline: none;
    }
  }
  & > input[type="file"] {
    font-size: inherit;
    padding: 10px;
    border-radius: 7.5px;
    border: 2px solid ${styling.MAIN_GRAY};
    width: 210px;
    &:hover {
      border: 2px solid rgba(${styling.MAIN_WINE}, 0.7);
      outline: none;
      cursor: pointer;
    }
  }
  & > textarea {
    width: 468px;
    height: 80px;
    font-size: inherit;
    font-family: inherit;
    padding: 10px;
    border-radius: 7.5px;
    border: 2px solid ${styling.MAIN_GRAY};
    resize: none;
    &:focus {
      border: 2px solid rgba(${styling.MAIN_WINE}, 0.7);
      outline: none;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
