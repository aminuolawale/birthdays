import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ME, UPDATE_MEDIA } from "../../graph-ql/schema";
import { Redirect } from "react-router-dom";
import LoadSpinner from "../../components/LoadSpinner";
import { useForm } from "react-hook-form";
import useCloudinary from "../../hooks/useCloudinary";
import { levelLoading } from "../../img";
import { store } from "../../store";
import Banner from "../../components/Banner";
import ProfileCard from "../../components/ProfileCard";
import * as style from "./style";

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
      <style.Account>
        <Banner
          uploading={bannerUploading}
          formRef={register}
          banner={banner ? banner : user.banner}
          loading={levelLoading}
        ></Banner>
        <ProfileCard user={user}></ProfileCard>
      </style.Account>
    );
  }
};

export default Account;
