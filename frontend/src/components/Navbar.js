import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { AUTH_USER } from "../graph-ql/schema";
import Motion from "./Motion";
import { authUserVar } from "../cache";
import { useHistory } from "react-router-dom";
import LoadSpinner from "./LoadSpinner";
const Navbar = ({ data }) => {
  console.log("received", data);
  const [dropdownActive, setDropdownActive] = useState(false);
  const history = useHistory();
  const logout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("userThumb", "");
    localStorage.setItem("verified", "");
    authUserVar({
      loggedIn: false,
      userThumb: "",
      verified: "",
    });
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
        {data.authUser.loggedIn ? (
          <Link to="/account">
            <img
              onMouseEnter={() => setDropdownActive(true)}
              onMouseLeave={() => setDropdownActive(false)}
              className="navbar__links__image"
              src={data.authUser.userThumb}
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
