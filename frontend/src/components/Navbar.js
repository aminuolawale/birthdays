import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__header">
        <h1 className="navbar__header__text">Birthdays</h1>
      </div>
      <ul className="navbar__links">
        <Link to="/login" className="navbar__links__item">
          Login
        </Link>
        <Link to="/signup" className="navbar__links__item">
          Sign Up
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
