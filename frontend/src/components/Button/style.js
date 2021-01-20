import React from "react";
import styled, { css } from "styled-components";
import { styling } from "../../constants";

const StyledButton = styled.button`
  background: ${styling.MAIN_WINE};
  color: ${styling.MAIN_CREAM};
  text-align: center;
  &:hover {
    cursor: pointer;
    background: darken(${styling.MAIN_WINE}, 5%);
  }
  ${(props) => {
    switch (props.size) {
      case "xsm":
        return css`
          font-size: ${styling.XSM_FONT};
          padding: 5px 10px;
          border-radius: calc((${styling.MD_FONT} + 10px) / 4);
        `;
      case "sm":
        return css`
          font-size: ${styling.SM_FONT};
          padding: 10px 20px;
          border-radius: calc((${styling.MD_FONT} + 20px) / 4);
        `;
      case "md":
        return css`
          font-size: ${styling.MD_FONT};
          padding: 15px 30px;
          border-radius: calc((${styling.MD_FONT} + 30px) / 4);
        `;
      case "lg":
        return css`
          font-size: ${styling.LG_FONT};
          padding: 20px 40px;
          border-radius: calc((${styling.LG_FONT} + 40px) / 4);
        `;
      case "xlg":
        return css`
          font-size: ${styling.XLG_FONT};
          padding: 20px 40px;
          border-radius: calc((${styling.LG_FONT} + 40px) / 4);
        `;
    }
  }}
  ${(props) =>
    props.expand &&
    css`
      width: 100%;
    `}
`;

export default StyledButton;
