import React, { useState } from "react";
import BirthdayForm from "../components/BirthdayForm";
import { Redirect } from "react-router-dom";

const CreateBirthday = () => {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  if (uploadSuccess) {
    return <Redirect to="/"></Redirect>;
  }
  return (
    <div>
      Create a birthday event for your friend.
      <BirthdayForm
        uploadSucces={uploadSuccess}
        setUploadSuccess={setUploadSuccess}
      ></BirthdayForm>
    </div>
  );
};

export default CreateBirthday;
