import { useEffect, useState } from "react";

const uploadUrl = process.env.REACT_APP_UPLOAD_URL;
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

const useCloudinary = (file) => {
  const [secureUrl, setSecureUrl] = useState(null);

  useEffect(() => {
    if (file && file.length > 0) {
      var payload = new FormData();
      Array.from(file).map((f) => payload.append("file", f));
      payload.append("upload_preset", uploadPreset);

      fetch(uploadUrl, { method: "POST", body: payload })
        .then((res) => res.json())
        .then((data) => {
          setSecureUrl(data.secure_url);
        })
        .catch((err) => console.log(err.message));
    }
  }, [file]);
  console.log("the secure ur", secureUrl);
  return { secureUrl };
};

export default useCloudinary;
