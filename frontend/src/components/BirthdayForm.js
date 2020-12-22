import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BIRTHDAY } from "../graph-ql/schema";
import { useForm, useWatch } from "react-hook-form";
import useCloudinary from "../hooks/useCloudinary";
import { Redirect } from "react-router-dom";
import ImageViewer from "./ImageViewer";

const BirthdayForm = ({ uploadSuccess, setUploadSuccess }) => {
  const { register, handleSubmit, watch } = useForm();
  const [uploadFile, setUploadFile] = useState(null);
  const [graphPayload, setGraphPayload] = useState(null);
  const [images, setImages] = useState([]);
  const { secureUrl } = useCloudinary(uploadFile);

  const coverImage = watch("coverImage");
  const extraImages = watch("extraImages");

  useEffect(() => {
    if (coverImage && coverImage.length > 0) {
      const k = window.URL.createObjectURL(coverImage[0]);
      images.push(k);
      setImages(images);
    }
  }, [coverImage, images, setImages]);

  useEffect(() => {
    if (extraImages && extraImages.length > 0) {
      for (let i = 0; i < extraImages.length; i++) {
        const l = window.URL.createObjectURL(extraImages[i]);
        images.push(l);
        setImages(images);
      }
    }
  }, [extraImages, images, setImages]);

  const [createBirthday, { loading, error }] = useMutation(CREATE_BIRTHDAY, {
    onCompleted: (data) => {
      console.log("Data from mutation", data);
      setUploadSuccess(true);
    },
    onError: (error) =>
      console.error("Error creating a birthday", error.message),
  });

  const onSubmit = (data) => {
    const vars = {
      firstName: data.firstName,
      lastName: data.lastName,
      nickname: data.nickname ? data.nickname : "",
      date: data.date,
      coverImage: { file: data.coverImage[0], caption: data.coverImageCaption },
    };
    setUploadFile(vars.coverImage.file);
    setGraphPayload(vars);
  };
  useEffect(() => {
    if (secureUrl) {
      graphPayload["coverImage"]["file"] = secureUrl;
      createBirthday({
        variables: graphPayload,
      });
    }
  }, [secureUrl]);
  console.log("the cover Image", coverImage);
  console.log("the images being passed", images);
  return (
    <div className="birthdayForm">
      <form onSubmit={handleSubmit(onSubmit)} className="birthdayForm__form">
        <div className="birthdayForm__form__fieldGroup">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            ref={register}
          ></input>
        </div>
        <div className="birthdayForm__form__fieldGroup">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            ref={register}
          ></input>
        </div>
        <div className="birthdayForm__form__fieldGroup">
          <label htmlFor="nickname">Nickname</label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            ref={register}
          ></input>
        </div>
        <div className="birthdayForm__form__fieldGroup">
          <label htmlFor="coverImage">Cover Image</label>
          <input
            type="file"
            name="coverImage"
            id="coverImage"
            ref={register}
          ></input>
          <label htmlFor="coverImageCaption">Caption</label>
          <input
            type="text"
            name="coverImageCaption"
            id="coverImageCaption"
            ref={register}
          ></input>
        </div>
        <div className="birthdayForm__form__fieldGroup">
          <label htmlFor="extraImages">Extra Images</label>
          <input
            type="file"
            name="extraImages"
            id="extraImages"
            multiple
            ref={register}
          ></input>
        </div>
        <div className="birthdayForm__form__fieldGroup">
          <label htmlFor="date">Date</label>
          <input type="date" name="date" id="date" ref={register}></input>
        </div>
        <div className="birthdayForm__form__button">
          <button type="submit">Create Birthday</button>
        </div>
      </form>
      <div>
        <ImageViewer images={images}></ImageViewer>
      </div>
    </div>
  );
};

export default BirthdayForm;
