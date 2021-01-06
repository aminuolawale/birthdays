import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = (props) => {
  return (
    <div className="layout">
      <Navbar></Navbar>
      <div className="layout__content">
        {/* {data.authUser.verified === "false" && data.authUser.loggedIn && (
          <VerificationPrompt></VerificationPrompt>
        )} */}
        {props.children}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
