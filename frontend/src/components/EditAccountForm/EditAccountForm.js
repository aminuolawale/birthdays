import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import useCloudinary from "../../hooks/useCloudinary";
import { ME, UPDATE_MEDIA } from "../../graph-ql/schema";
import LoadSpinner from "../LoadSpinner";
import { UPDATE_USER } from "../../graph-ql/schema";
import { useHistory } from "react-router-dom";
import { store } from "../../store";
import { format } from "date-fns";
import Loading from "../../img/loading1.gif";
import * as style from "./style";

const EditAccountForm = () => {
  const { dispatch } = useContext(store);
  const { data, loading } = useQuery(ME, { fetchPolicy: "no-cache" });
  const [userData, setUserData] = useState({});
  const [userAvatar, setUserAvatar] = useState(null);
  const { register, watch, handleSubmit } = useForm();
  const watchAvatar = watch("avatar");
  const { secureUrl } = useCloudinary(watchAvatar);
  const [dateFieldActive, setDateFieldActive] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const history = useHistory();

  const [UpdateMedia] = useMutation(UPDATE_MEDIA, {
    onCompleted(data) {
      const result = data.updateMedia;
      if (result.ok) {
        dispatch({ type: "UPDATE_AVATAR_SUCCESS", data: result.result.avatar });
      }
    },
  });
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted(data) {
      const { ok } = data.updateUser;
      if (ok) {
        history.push("/account");
      }
    },
  });

  useEffect(() => {
    if (data) {
      setUserData((s) => ({ ...s, ...data.me.result }));
    }
  }, [data, setUserData]);

  useEffect(() => {
    if (secureUrl) {
      UpdateMedia({ variables: { url: secureUrl, mediaType: "avatar" } });
      setUserAvatar(secureUrl);
      setImageUploading(false);
    }
  }, [secureUrl, UpdateMedia]);

  const onSubmit = (payload) => {
    if (document.getElementById("dateOfBirth").type === "text") {
      payload.dateOfBirth = userData.dateOfBirth;
    }
    const cleanedPayload = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      middleName: payload.middleName,
      nickname: payload.nickname,
      bio: payload.bio,
      dateOfBirth: payload.dateOfBirth,
      phone: "oifdja",
      address: {
        street: payload.street,
        city: payload.city,
        state: payload.state,
        country: payload.country,
        lng: 0.9,
        lat: 92.2,
      },
    };
    updateUser({ variables: cleanedPayload });
  };

  useEffect(() => {
    if (watchAvatar && watchAvatar.length > 0) {
      setImageUploading(true);
    }
  }, [watchAvatar]);
  if (loading) {
    return <LoadSpinner></LoadSpinner>;
  } else {
    return (
      <style.EditAccountForm duration=".25" onSubmit={handleSubmit(onSubmit)}>
        <style.EditAccountFormHeader>
          <h2>
            Edit <span className="mainHighlight">Profile</span>
          </h2>
        </style.EditAccountFormHeader>
        <style.EditAccountFormBody>
          <style.EditAccountImageContainer>
            <label htmlFor="avatar">
              <style.EditAccountImage
                src={userAvatar ? userAvatar : userData.avatar}
                alt="avatar"
              ></style.EditAccountImage>
            </label>
            <style.EditAccountImageInput>
              {imageUploading ? (
                <img src={Loading} alt="avatar-loading"></img>
              ) : (
                <input
                  ref={register}
                  name="avatar"
                  id="avatar"
                  type="file"
                ></input>
              )}
            </style.EditAccountImageInput>
          </style.EditAccountImageContainer>
          <style.EditAccountFormFields>
            <style.EditAccountFormGroup>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                defaultValue={userData.firstName}
                ref={register}
              ></input>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                defaultValue={userData.lastName}
                ref={register}
              ></input>
            </style.EditAccountFormGroup>
            <style.EditAccountFormGroup>
              <input
                id="middleName"
                name="middleName"
                type="text"
                placeholder="Middle Name"
                defaultValue={userData.middleName}
                ref={register}
              ></input>
              <input
                id="nickname"
                name="nickname"
                type="text"
                placeholder="Nickname"
                defaultValue={userData.nickname}
                ref={register}
              ></input>
            </style.EditAccountFormGroup>
            <style.EditAccountFormGroup>
              <textarea
                id="bio"
                name="bio"
                type="text"
                placeholder="Bio"
                defaultValue={userData.bio}
                ref={register}
              ></textarea>
            </style.EditAccountFormGroup>
            <style.EditAccountFormGroup>
              <input
                id="country"
                name="country"
                type="text"
                placeholder="Country"
                defaultValue={userData.address ? userData.address.country : ""}
                ref={register}
              ></input>
              <input
                id="street"
                name="street"
                type="text"
                placeholder="Street"
                defaultValue={userData.address ? userData.address.street : ""}
                ref={register}
              ></input>
            </style.EditAccountFormGroup>
            <style.EditAccountFormGroup>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="City"
                defaultValue={userData.address ? userData.address.city : ""}
                ref={register}
              ></input>
              <input
                id="state"
                name="state"
                type="text"
                placeholder="State"
                defaultValue={userData.address ? userData.address.state : ""}
                ref={register}
              ></input>
            </style.EditAccountFormGroup>
            <style.EditAccountFormGroup>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type={dateFieldActive ? "date" : "text"}
                placeholder="Date of Birth"
                defaultValue={
                  userData.dateOfBirth
                    ? format(
                        new Date(Date.parse(userData.dateOfBirth)),
                        "dd MMM yyyy"
                      )
                    : ""
                }
                onFocus={() => setDateFieldActive(true)}
                ref={register}
              ></input>
            </style.EditAccountFormGroup>
            <div>
              <Button size="sm" expand={true}>
                Save Profile
              </Button>
            </div>
          </style.EditAccountFormFields>
        </style.EditAccountFormBody>
      </style.EditAccountForm>
    );
  }
};

export default EditAccountForm;
