import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Motion from "./Motion";
import { useForm } from "react-hook-form";
import Button from "./Button";
import useCloudinary from "../hooks/useCloudinary";
import { ME, UPDATE_MEDIA } from "../graph-ql/schema";
import LoadSpinner from "./LoadSpinner";
import { UPDATE_USER } from "../graph-ql/schema";
import { useHistory } from "react-router-dom";
import { store } from "../store";
import { format } from "date-fns";
import Loading from "../img/loading1.gif";
import csc from "country-state-city";
import AddressCard from "./AddressCard";

const EditAccountForm = () => {
  const { dispatch } = useContext(store);
  const { data, loading } = useQuery(ME, { fetchPolicy: "no-cache" });
  const [userData, setUserData] = useState({});
  const [userAvatar, setUserAvatar] = useState(null);
  const { register, watch, handleSubmit } = useForm();
  const watchAvatar = watch("avatar");
  const watchCountry = watch("country");
  const watchState = watch("state");
  const { secureUrl } = useCloudinary(watchAvatar);
  const [dateFieldActive, setDateFieldActive] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const history = useHistory();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [addressFieldsActive, setAddressFieldsActive] = useState(false);
  useEffect(() => {
    const rawCountries = csc.getAllCountries();
    const countries = rawCountries.map((rc) => {
      return { name: rc.name, code: rc.isoCode };
    });
    countries.unshift({ name: "", code: "" });
    setCountries(countries);
  }, []);

  useEffect(() => {
    if (watchCountry && watchCountry !== "") {
      const wc = watchCountry.split(" ");
      const rawStates = csc.getStatesOfCountry(wc[0]);
      const states = rawStates.map((rs) => {
        return { name: rs.name, code: rs.isoCode, cCode: rs.countryCode };
      });
      states.unshift({ name: "", code: "", cCode: "" });
      setStates(states);
    }
  }, [watchCountry]);

  useEffect(() => {
    if (watchState && watchState !== "") {
      const wc = watchState.split(" ");
      const rawCities = csc.getCitiesOfState(wc[0], wc[1]);
      const cities = rawCities.map((rc) => {
        return { name: rc.name, lat: rc.latitude, lng: rc.longitude };
      });
      cities.unshift({ name: "", lng: "", lat: "" });
      setCities(cities);
    }
  }, [watchState]);

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
    const stateData = addressFieldsActive
      ? payload.state.split(" ")[2]
      : userData.address.state;
    const countryData = addressFieldsActive
      ? payload.country.split(" ")[1]
      : userData.address.country;
    const city = addressFieldsActive
      ? payload.city.split(" ")[0]
      : userData.address.city;
    const lat = addressFieldsActive
      ? payload.city.split(" ")[1]
      : userData.address.lat;
    const lng = addressFieldsActive
      ? payload.city.split(" ")[2]
      : userData.address.lng;
    const cleanedPayload = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      middleName: payload.middleName,
      nickname: payload.nickname,
      bio: payload.bio,
      dateOfBirth: payload.dateOfBirth,
      phone: payload.phone,
      address: {
        street: payload.street,
        city: city,
        state: stateData,
        country: countryData,
        lng: lng,
        lat: lat,
      },
    };
    console.log("the cleaned payload", cleanedPayload);
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
            <label htmlFor="avatar">
              <img
                className="accountForm__body__image__img"
                src={userAvatar ? userAvatar : userData.avatar}
                alt="avatar"
              ></img>
            </label>
            <div className="accountForm__body__image__input">
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
            <div className="accountForm__body__fields__fieldGroup">
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Phone Number"
                defaultValue={userData.phone}
                ref={register}
              ></input>
            </div>
            <div className="accountForm__body__fields__fieldGroup accountForm__body__fields__fieldGroup--alt">
              <textarea
                id="bio"
                name="bio"
                type="text"
                placeholder="Bio"
                defaultValue={userData.bio}
                ref={register}
              ></textarea>
            </div>
            {addressFieldsActive ? (
              <div>
                <div className="accountForm__body__fields__fieldGroup">
                  <select
                    id="country"
                    name="country"
                    type="text"
                    placeholder="Country"
                    required
                    defaultValue={
                      userData.address ? userData.address.country : ""
                    }
                    ref={register}
                  >
                    {countries.map((c) => (
                      <option key={c.name}>{c.code + " " + c.name}</option>
                    ))}
                  </select>
                  <select
                    id="state"
                    name="state"
                    type="text"
                    placeholder="State"
                    required
                    defaultValue={
                      userData.address ? userData.address.state : ""
                    }
                    ref={register}
                  >
                    {states.map((s) => (
                      <option key={s.name}>
                        {s.cCode + " " + s.code + " " + s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="accountForm__body__fields__fieldGroup">
                  <select
                    id="city"
                    name="city"
                    type="text"
                    placeholder="City"
                    required
                    defaultValue={userData.address ? userData.address.city : ""}
                    ref={register}
                  >
                    {cities.map((c) => (
                      <option key={c.name}>
                        {c.name + " " + c.lat + " " + c.lng}
                      </option>
                    ))}
                  </select>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    placeholder="Street"
                    defaultValue={
                      userData.address ? userData.address.street : ""
                    }
                    ref={register}
                  ></input>
                </div>
              </div>
            ) : (
              <AddressCard
                address={userData.address}
                setAddressFieldsActive={setAddressFieldsActive}
                addressFieldsActive={addressFieldsActive}
              ></AddressCard>
            )}

            <div className="accountForm__body__fields__fieldGroup">
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
