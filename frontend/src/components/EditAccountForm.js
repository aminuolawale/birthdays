import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Motion from "./Motion";
import { useForm } from "react-hook-form";
import Button from "./Button";
import useCloudinary from "../hooks/useCloudinary";
import { ME, CHANGE_AVATAR } from "../graph-ql/schema";
import LoadSpinner from "./LoadSpinner";
import { UPDATE_USER } from "../graph-ql/schema";
import { useHistory } from "react-router-dom";

const EditAccountForm = () => {
  const { data, loading } = useQuery(ME, { fetchPolicy: "no-cache" });
  const [userData, setUserData] = useState({});
  const [userAvatar, setUserAvatar] = useState(null);
  const { register, watch, handleSubmit } = useForm();
  const watchAvatar = watch("avatar");
  console.log("the avatar", watchAvatar);
  const { secureUrl } = useCloudinary(watchAvatar);
  console.log("the secure url", secureUrl);
  const [dateFieldActive, setDateFieldActive] = useState(false);
  const history = useHistory();

  const [changeAvatar] = useMutation(CHANGE_AVATAR, {
    onCompleted(data) {
      const result = data.changeAvatar.result;
      if (result.ok && result.avatar) {
        localStorage.setItem("userThumb", result.avatar);
        setUserAvatar(result.avatar);
      }
    },
  });
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted(data) {
      const result = data.updateUser.result;
      console.log("<<<<<<<<<<<<<<<<,,", result.ok);
      if (result.ok) {
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
      changeAvatar({ variables: { url: secureUrl } });
    }
  }, [secureUrl]);

  const onSubmit = (payload) => {
    const cleanedPayload = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      middleName: payload.middleName,
      nickname: payload.nickname,
      bio: payload.bio,
      phone: payload.phone,
      dateOfBirth: payload.dateOfBirth,
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

  if (loading) {
    return <LoadSpinner></LoadSpinner>;
  } else {
    console.log(userData);
    return (
      <Motion
        elem="form"
        duration=".25"
        className="accountForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="accountForm__header">
          <h2 className="accountForm__header__title">
            Edit <span className="mainHighlight">Profile</span>
          </h2>
        </div>
        <div className="accountForm__body">
          <div className="accountForm__body__image">
            <img src={userAvatar ? userAvatar : userData.avatar}></img>
            <div className="accountForm__body__fields__fieldGroup">
              <input ref={register} name="avatar" type="file"></input>
            </div>
          </div>
          <div className="form__body__fields">
            <div className="accountForm__body__fields__fieldGroup">
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
            </div>
            <div className="accountForm__body__fields__fieldGroup">
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
            </div>
            <div className="accountForm__body__fields__fieldGroup accountForm__body__fields__fieldGroup--alt">
              <textarea
                id="middleName"
                name="middleName"
                type="text"
                placeholder="Bio"
                defaultValue={userData.bio}
                ref={register}
              ></textarea>
            </div>
            <div className="accountForm__body__fields__fieldGroup">
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
                ref={register}
              ></input>
            </div>
            <div className="accountForm__body__fields__fieldGroup">
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
            </div>
            <div className="accountForm__body__fields__fieldGroup">
              <input
                id="date"
                name="date"
                type={dateFieldActive ? "date" : "text"}
                placeholder="Date of Birth"
                defaultValue={
                  userData.address ? userData.address.dateOfBirth : ""
                }
                onFocus={() => setDateFieldActive(true)}
                ref={register}
              ></input>
            </div>
            <div>
              <Button size="sm">Save Profile</Button>
            </div>
          </div>
        </div>
      </Motion>
    );
  }
};

export default EditAccountForm;
