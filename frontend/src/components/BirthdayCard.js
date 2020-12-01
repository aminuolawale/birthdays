import React from "react";
import { FaRegKissWinkHeart } from "react-icons/fa";
import { GiHearts } from "react-icons/gi";

const BirthdayCard = (props) => {
  const data = props.data;
  console.log("the data passed", data);
  const celebrant = data.celebrant;
  const coverImage = data.images.filter((d) => d.isCover === true)[0];
  const imgSrc = coverImage ? coverImage.file : "";
  return (
    <div className="birthdayCard">
      <div className="birthdayCard__text">
        <p className="birthdayCard__text__main">
          {celebrant.nickname ? celebrant.nickname : data.firstName}
        </p>
        <p className="birthdayCard__text__sub">25 + 1</p>
      </div>
      <img src={imgSrc} alt="celebrant-image"></img>
      <div className="birthdayCard__actions">
        <p className="birthdayCard__actions__item">
          <FaRegKissWinkHeart></FaRegKissWinkHeart>
        </p>
        <p className="birthdayCard__actions__item">
          <GiHearts></GiHearts>
        </p>
      </div>
    </div>
  );
};

export default BirthdayCard;
