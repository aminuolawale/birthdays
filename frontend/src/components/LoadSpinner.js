import React from "react";
import LoadingScreen from "react-loading-screen";
import { birthdaysLogo } from "../img";

const LoadSpinner = () => {
  return (
    <LoadingScreen
      loading={true}
      bgColor="#FDF9EF"
      spinnerColor="#AE1163"
      textColor="#676767"
      logoSrc={birthdaysLogo}
    >
      Birthdays
    </LoadingScreen>
  );
};

export default LoadSpinner;
