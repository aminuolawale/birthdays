import React from "react";
import { Link } from "react-router-dom";
import * as style from "./style";
import Button from "../Button";
import { format } from "date-fns";

const ProfileCard = ({ user }) => {
  return (
    <style.Card>
      <style.CardMain>
        <style.CardImage>
          <img src={user.avatar}></img>
        </style.CardImage>
        <style.CardItems>
          <h2>{user.fullName}</h2>
          <p>{user.email}</p>
          <Link to="/edit_account">
            <Button size="sm">Edit Profile</Button>
          </Link>
        </style.CardItems>
      </style.CardMain>
      <style.CardSub>
        <p>{user.bio}</p>
        <style.CardSubMeta>
          <p>
            {user.address
              ? `${user.address.state}, ${user.address.country}`
              : ``}
          </p>
          <p>{format(new Date(user.dateJoined), "MMM yyyy")}</p>
        </style.CardSubMeta>
      </style.CardSub>
    </style.Card>
  );
};

export default ProfileCard;
