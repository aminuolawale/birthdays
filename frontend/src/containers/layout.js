import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Layout = (props) => {
  return (
    <div>
      <Navbar></Navbar>
      <Link to="/create_birthday">Create Birthday</Link>
      {props.children}
    </div>
  );
};

export default Layout;
