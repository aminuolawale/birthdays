import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { store } from "../../store";
import * as style from "./style";

const Navbar = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const history = useHistory();
  const [dropdownActive, setDropdownActive] = useState(false);
  const logout = () => {
    dispatch({ type: "LOGOUT_SUCCESS" });
    setDropdownActive(false);
    history.push("/");
  };

  return (
    <style.Nav className="navbar">
      <style.NavHeader>
        <Link to="/">
          <style.NavHeaderText>Birthdays</style.NavHeaderText>
        </Link>
      </style.NavHeader>
      <style.NavLinks>
        {globalState.state.loggedIn ? (
          <Link to="/account">
            <style.NavImage
              onMouseEnter={() => setDropdownActive(true)}
              onMouseLeave={() => setDropdownActive(false)}
              src={globalState.state.userThumb}
            ></style.NavImage>
          </Link>
        ) : (
          <div>
            <style.NavItem to="/login">Log in</style.NavItem>
            <style.NavItem to="/signup">Sign up</style.NavItem>
          </div>
        )}
      </style.NavLinks>
      {dropdownActive && (
        <style.NavDropdownContainer
          onMouseEnter={() => setDropdownActive(true)}
          onMouseLeave={() => setDropdownActive(false)}
        >
          <style.NavDropdown>
            <style.NavDropdownList>
              <div>
                <style.NavDropdownLink to="/account">
                  <p>Profile</p>
                </style.NavDropdownLink>
              </div>
              <div onClick={logout}>
                <p>Logout</p>
              </div>
            </style.NavDropdownList>
          </style.NavDropdown>
        </style.NavDropdownContainer>
      )}
    </style.Nav>
  );
};

export default Navbar;
