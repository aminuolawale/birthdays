import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Layout = (props) => {
  return (
    <div className="layout">
      <Navbar></Navbar>
      {props.children}
    </div>
  );
};

export default Layout;
