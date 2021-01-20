import styled from "styled-components";
import { styling } from "../../constants";

export const Footer = styled.div`
  height: 400px;
  padding: 40px 160px;
  background: ${styling.MAIN_DARK};
  color: ${styling.MAIN_CREAM};
  position: relative;
`;

export const FooterLists = styled.div`
  opacity: 0.8;
  display: flex;
  align-items: top;
`;

export const FooterListItem = styled.div`
  width: 400px;
  & > ul {
    margin-top: 20px;
    font-size: $xsm-font;
    & > li {
      margin-top: 10px;
    }
  }
`;

export const FooterListHeader = styled.p`
  font-size: $sm-font;
  font-weight: bold;
`;

export const FooterBase = styled.div`
  opacity: 0.8;
  position: absolute;
  bottom: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  & > p {
    font-size: $sm-font;
  }
  & > ul {
    margin-left: 40px;
    font-size: $xsm-font;
    display: flex;
    align-items: center;
    & > li {
      margin-left: 20px;
    }
  }
`;
