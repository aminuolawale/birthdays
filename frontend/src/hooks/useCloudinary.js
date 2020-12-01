import { useEffect, useState } from "react";

const uploadUrl = process.env.REACT_APP_UPLOAD_URL;

const useCloudinary = (file) => {
  const [secureUrl, setSecureUrl] = useState(null);

  useEffect(() => {
    if (file) {
      var payload = new FormData();
      payload.append("file", file);
      payload.append("upload_preset", "pzpdpnze");

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
