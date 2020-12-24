import React, { useEffect } from "react";
import Button from "../components/Button";
import Ribbon from "../img/ribbons.png";

const Home = () => {
  return (
    <div className="home">
      <div className="home__hero">
        <div className="home__hero__content">
          <p className="home__hero__content__mainText">
            Make your birthdays much more fun.
          </p>
          <Button size="lg">Join Now</Button>
        </div>
      </div>
      <div className="home__showcase"></div>
      <img className="home__ribbons--0" src={Ribbon} alt="ribbon"></img>
    </div>
  );
};

export default Home;
