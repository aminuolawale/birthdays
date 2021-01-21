import React from "react";
import * as style from "./style";

const Banner = ({ uploading, formRef, banner, loading }) => {
  return (
    <style.Banner>
      {uploading ? (
        <style.BannerLoader
          src={loading}
          alt="banner-uploading"
        ></style.BannerLoader>
      ) : (
        <label htmlFor="banner">
          <style.BannerImage src={banner}></style.BannerImage>
        </label>
      )}
      <input type="file" name="banner" id="banner" ref={formRef}></input>
    </style.Banner>
  );
};

export default Banner;
