import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__header">
        <h1>Birthdays</h1>
      </div>
      <ul className="navbar__links">
        <li className="navbar__links__item">Login</li>
        <li className="navbar__links__item">Sign Up</li>
      </ul>
    </div>
  );
};

export default Navbar;
