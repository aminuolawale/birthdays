import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { AUTH_USER } from "../graph-ql/schema";
const Navbar = () => {
  const { data } = useQuery(AUTH_USER);
  return (
    <div className="navbar">
      <div className="navbar__header">
        <h1 className="navbar__header__text">Birthdays</h1>
      </div>
      <ul className="navbar__links">
        {data.authUser.loggedIn ? (
          <Link to="/account">
            <img
              className="navbar__links__image"
              src={data.authUser.userThumb}
            ></img>
          </Link>
        ) : (
          <div>
            <Link to="/login" className="navbar__links__item">
              Login
            </Link>
            <Link to="/signup" className="navbar__links__item">
              Sign Up
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
