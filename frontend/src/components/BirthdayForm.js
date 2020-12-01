import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BIRTHDAY } from "../graph-ql/schema";
import { useForm } from "react-hook-form";
import useCloudinary from "../hooks/useCloudinary";

const BirthdayForm = () => {
  const { register, handleSubmit } = useForm();
  const [uploadFile, setUploadFile] = useState(null);
  const [graphPayload, setGraphPayload] = useState(null);
  const { secureUrl } = useCloudinary(uploadFile);

  const [createBirthday, { loading, error }] = useMutation(CREATE_BIRTHDAY, {
    onCompleted: (data) => console.log("Data from mutation", data),
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          ref={register}
        ></input>
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" id="lastName" ref={register}></input>
      </div>
      <div>
        <label htmlFor="nickname">Nickname</label>
        <input type="text" name="nickname" id="nickname" ref={register}></input>
      </div>
      <div>
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
      <div>
        <label htmlFor="coverImage">Extra Images</label>
        <input
          type="file"
          name="extraImages"
          id="extraImages"
          multiple
          ref={register}
        ></input>
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input type="date" name="date" id="date" ref={register}></input>
      </div>
      <button type="submit">Create Birthday</button>
    </form>
  );
};

export default BirthdayForm;
