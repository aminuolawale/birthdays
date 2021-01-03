import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ME } from "../graph-ql/schema";
import Button from "../components/Button";
import { Redirect } from "react-router-dom";

const Account = () => {
  const { loading, error, data } = useQuery(ME, { fetchPolicy: "no-cache" });

  if (loading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <Redirect to="/login"></Redirect>;
  }
  if (data) {
    const user = data.me.result;
    return (
      <div className="account">
        <div className="account__details">
          <div className="account__details__image">
            <img src="https://1.bp.blogspot.com/-ZOlHQ4rlI2Q/XbK1mhLeeSI/AAAAAAAAHyU/BZFf2ah_uw4a6oDyr5ewgfP0Z3PM1-9fACKgBGAsYHg/s1600/hot-black-women_021.jpeg"></img>
          </div>
          <div className="account__details__items">
            <h2>{user.fullName}</h2>
            <p>{user.email}</p>
            <Button size="sm">Edit Profile</Button>
          </div>
        </div>
      </div>
    );
  }
};

export default Account;
