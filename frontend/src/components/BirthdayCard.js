import React from "react";
import { FaRegKissWinkHeart } from "react-icons/fa";
import { GiHearts } from "react-icons/gi";
const BirthdayCard = (props) => {
  const data = props.data;
  const coverImage = data.images.filter((d) => d.isCover === true)[0];
  const imgSrc = coverImage ? coverImage.file : "";
  console.log("coverImage", coverImage);
  return (
    <div className="birthdayCard">
      <div className="birthdayCard__text">
        <p className="birthdayCard__text__main">{data.celebrant}</p>
        {/* <p className="birthdayCard__text__sub">25 + 1</p> */}
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
