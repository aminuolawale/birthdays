import styled from "styled-components";
import { styling } from "../../constants";
import { Link } from "react-router-dom";

export const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 120px;
  padding: 0 160px;
  position: relative;
`;

export const NavHeader = styled.div`
  color: ${styling.MAIN_WINE};
`;
export const NavHeaderText = styled.h1`
  font-size: ${styling.LG_FONT};
`;

export const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  color: ${styling.MAIN_WINE};
  font-size: ${styling.SM_FONT};
`;

export const NavImage = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 30px;
`;

export const NavItem = styled(Link)`
  margin: 0 20px;
`;

export const NavDropdownContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 160px;
  padding-top: 50px;
`;

export const NavDropdown = styled.div`
  background: ${styling.MAIN_WHITE};
  font-size: ${styling.XSM_FONT};
  width: 200px;
  padding: 20px 0;
  border-radius: 20px;
  box-shadow: 1px 1px 30px ${styling.MAIN_GRAY};
  z-index: 1;
`;

export const NavDropdownList = styled.div`
  & > div {
    padding: 10px 20px;
    &:hover {
      background: ${styling.MAIN_CREAM};
      cursor: pointer;
    }
  }
`;

export const NavDropdownLink = styled(Link)`
  color: ${styling.MAIN_WINE};
`;
