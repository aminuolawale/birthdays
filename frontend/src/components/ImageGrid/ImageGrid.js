import React from "react";
import * as style from "./style";
import * as images from "../../img";

const ImageGrid = () => {
  return (
    <style.ImageGrid>
      <img src={images.grinningBaby} alt="ribbon"></img>
      <img src={images.grinningGuy} alt="ribbon"></img>
      <img src={images.pointingGirl} alt="ribbon"></img>
      <img src={images.toucheGuy} alt="ribbon"></img>
    </style.ImageGrid>
  );
};

export default ImageGrid;
