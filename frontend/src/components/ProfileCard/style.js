import styled from "styled-components";
import { styling } from "../../constants";

export const Card = styled.div`
  width: 440px;
  border-radius: 20px;
  padding: 40px;
  background: ${styling.MAIN_WHITE};
  margin-top: 40px;
`;

export const CardMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardImage = styled.div`
  height: 200px;
  width: 200px;
  & > img {
    border-radius: 100px;
  }
`;

export const CardItems = styled.div`
  & > h2 {
    margin-bottom: 10px;
  }
  & > p {
    margin-bottom: 10px;
  }
`;

export const CardSub = styled.div`
  margin-top: 20px;
  & > p {
    font-size: ${styling.XSM_FONT};
  }
`;

export const CardSubMeta = styled.div`
  margin-top: 10px;
  display: flex;
  & > p {
    margin-right: 40px;
  }
`;
