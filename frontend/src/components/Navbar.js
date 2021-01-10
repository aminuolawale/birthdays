import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Motion from "./Motion";
import { useHistory } from "react-router-dom";
import { store } from "../store";

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
    <div className="navbar">
      <div className="navbar__header">
        <Link to="/">
          <h1 className="navbar__header__text">Birthdays</h1>
        </Link>
      </div>
      <ul className="navbar__links">
        {globalState.state.loggedIn ? (
          <Link to="/account">
            <img
              onMouseEnter={() => setDropdownActive(true)}
              onMouseLeave={() => setDropdownActive(false)}
              className="navbar__links__image"
              src={globalState.state.userThumb}
              // src={userThumb}
            ></img>
          </Link>
        ) : (
          <div>
            <Link to="/login" className="navbar__links__item">
              Log in
            </Link>
            <Link to="/signup" className="navbar__links__item">
              Sign up
            </Link>
          </div>
        )}
      </ul>
      {dropdownActive && (
        <Motion
          elem="div"
          duration=".5"
          className="navbar__dropdown"
          onMouseEnter={() => setDropdownActive(true)}
          onMouseLeave={() => setDropdownActive(false)}
        >
          <div className="navbar__dropdown__list">
            <div>
              <Link className="navbar__dropdown__list__link" to="/account">
                <p>Profile</p>
              </Link>
            </div>
            <div onClick={logout}>
              <p>Logout</p>
            </div>
          </div>
        </Motion>
      )}
    </div>
  );
};

export default Navbar;
