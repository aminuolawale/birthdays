import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import * as style from "./style";

const Layout = (props) => {
  return (
    <style.Layout>
      <Navbar></Navbar>
      <style.LayoutContent>{props.children}</style.LayoutContent>
      <Footer></Footer>
    </style.Layout>
  );
};

export default Layout;
