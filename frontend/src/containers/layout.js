import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Layout = (props) => {
  return (
    <div className="layout">
      <Navbar></Navbar>
      {props.children}
      <Footer></Footer>
    </div>
  );
};

export default Layout;
