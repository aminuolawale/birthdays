import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ME } from "../graph-ql/schema";
import Button from "../components/Button";
import { Redirect } from "react-router-dom";
import LoadSpinner from "../components/LoadSpinner";
import Landscape from "../img/landscape.jpg";
import Motion from "../components/Motion";
import { Link } from "react-router-dom";

const Account = () => {
  const { loading, error, data } = useQuery(ME, { fetchPolicy: "no-cache" });

  if (loading) {
    return <LoadSpinner></LoadSpinner>;
  }
  if (error) {
    return <Redirect to="/login"></Redirect>;
  }
  if (data) {
    const user = data.me.result;
    return (
      <div className="account">
        <Motion elem="div" duration="1.5" className="account__banner">
          <img src={Landscape}></img>
        </Motion>
        <Motion elem="div" duration=".5" className="account__card">
          <div className="account__card__main">
            <div className="account__card__main__image">
              <img src={user.avatar}></img>
            </div>
            <div className="account__card__main__items">
              <h2>{user.fullName}</h2>
              <p>{user.email}</p>
              <Link to="/edit_account">
                <Button size="sm">Edit Profile</Button>
              </Link>
            </div>
          </div>
          <div className="account__card__sub">
            <p>{user.bio}</p>
            <div className="account__card__sub__meta">
              <p>Lagos, Nigeria</p>
              <p>{user.dateJoined}</p>
            </div>
          </div>
        </Motion>
      </div>
    );
  }
};

export default Account;
