import React from "react";
import LoadingScreen from "react-loading-screen";
import Birthdays from "../img/Birthdays.png";

const LoadSpinner = () => {
  return (
    <LoadingScreen
      loading={true}
      bgColor="#FDF9EF"
      spinnerColor="#AE1163"
      textColor="#676767"
      logoSrc={Birthdays}
    ></LoadingScreen>
  );
};

export default LoadSpinner;
