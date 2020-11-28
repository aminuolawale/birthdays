import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BIRTHDAY } from "../graph-ql/schema";
import { useForm } from "react-hook-form";

const uploadUrl = "https://api.cloudinary.com/v1_1/sndbxdiscovery/image/upload";

const BirthdayForm = () => {
  const { register, handleSubmit } = useForm();
  const [coverImageUrl, setCoverImageUrl] = useState("");

  const [createBirthday, { loading, error }] = useMutation(CREATE_BIRTHDAY, {
    onCompleted: (data) => console.log("Data from mutation", data),
    onError: (error) => console.error("Error creating a post", error.message),
  });
  const onSubmit = (data) => {
    console.log("the data", data);
    const vars = {
      celebrant: `${data.firstName} ${data.lastName}`,
      date: data.date,
      coverImage: { file: data.coverImage[0], caption: data.coverImageCaption },
    };
    var cloudinaryPayload = new FormData();
    cloudinaryPayload.append("file", vars.coverImage.file);
    cloudinaryPayload.append("upload_preset", "pzpdpnze");
    fetch(uploadUrl, { method: "POST", body: cloudinaryPayload })
      .then((res) => res.json())
      .then((data) => {
        setCoverImageUrl(data.secure_url);
        vars["coverImage"]["file"] = data.secure_url;
        console.log("the vars", vars);
        createBirthday({
          variables: vars,
        });
      })
      .catch((err) => console.log(err.message));
  };

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
