import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ME, UPDATE_MEDIA } from "../graph-ql/schema";
import Button from "../components/Button";
import { Redirect } from "react-router-dom";
import LoadSpinner from "../components/LoadSpinner";
import Landscape from "../img/landscape.jpg";
import Motion from "../components/Motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import useCloudinary from "../hooks/useCloudinary";
import Loading from "../img/loading1.gif";
import { store } from "../store";

const Account = () => {
  const { loading, error, data } = useQuery(ME, { fetchPolicy: "no-cache" });
  const { dispatch } = useContext(store);
  const { register, watch } = useForm();
  const watchBanner = watch("banner");
  const { secureUrl } = useCloudinary(watchBanner);
  const [banner, setBanner] = useState();
  const [bannerUploading, setBannerUploading] = useState(false);

  const [UpdateMedia] = useMutation(UPDATE_MEDIA, {
    onCompleted(data) {
      const result = data.updateMedia;
      if (result.ok) {
        dispatch({ type: "UPDATE_AVATAR_SUCCESS", data: result.result.avatar });
      }
    },
  });

  useEffect(() => {
    console.log("the banner has changed", watchBanner);
    if (watchBanner && watchBanner.length > 0) {
      setBannerUploading(true);
    }
  }, [watchBanner]);

  useEffect(() => {
    if (secureUrl) {
      console.log("the secureUrl", secureUrl);

      UpdateMedia({ variables: { url: secureUrl, mediaType: "banner" } });
      setBanner(secureUrl);
      setBannerUploading(false);
    }
  }, [secureUrl]);

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
          {bannerUploading ? (
            <img
              className="account__banner__loader"
              src={Loading}
              alt="banner-uploading"
            ></img>
          ) : (
            <label htmlFor="banner">
              <img
                className="account__banner__img"
                src={banner ? banner : user.banner}
              ></img>
            </label>
          )}
          <input type="file" name="banner" id="banner" ref={register}></input>
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
              <p>
                {user.address
                  ? `${user.address.state}, ${user.address.country}`
                  : ""}
              </p>
              <p>{format(new Date(user.dateJoined), "MMM yyyy")}</p>
            </div>
          </div>
        </Motion>
      </div>
    );
  }
};

export default Account;
