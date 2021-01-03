import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useQuery } from "@apollo/client";
import { AUTH_USER } from "../graph-ql/schema";
import VerificationPrompt from "../components/VerificationPrompt";
const Layout = (props) => {
  const { data } = useQuery(AUTH_USER);
  console.log("the data>>>>>>>>>>>>>>>>>>>>>>>.", data);
  return (
    <div className="layout">
      <Navbar></Navbar>
      {data.authUser.verified === "false" && data.authUser.loggedIn && (
        <VerificationPrompt></VerificationPrompt>
      )}
      {props.children}
      <Footer></Footer>
    </div>
  );
};

export default Layout;
