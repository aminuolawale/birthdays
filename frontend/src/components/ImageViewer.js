import React, { useState, useEffect } from "react";

const ImageViewer = ({ images }) => {
  return (
    <div className="imageViewer">
      <div className="imageViewer__current">
        <img src={images[0]} alt="currentImage"></img>
      </div>
      <div className="imageViewer__others">
        {images.slice(1).map((img, i) => (
          <img key={i} src={img}></img>
        ))}
      </div>
    </div>
  );
};

export default ImageViewer;
