import { styled } from "styled-components";
import { styling } from "../../constants";

export const VerificationPrompt = styled.div`
  color: ${styling.MAIN_WINE};
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${styling.MAIN_WINE};
  border-radius: 20px;
`;

export const VerificationText = styled.p`
  margin-right: 30px;
`;
