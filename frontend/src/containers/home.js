import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Baby1 from "../img/baby1.jpg";
import Guy1 from "../img/guy1.jpg";
import Guy2 from "../img/guy2.jpg";
import Girl1 from "../img/girl1.jpg";
import Motion from "../components/Motion";
import { store } from "../store";

const Home = () => {
  const globalState = useContext(store);
  return (
    <div className="home">
      <div className="home__hero">
        <div className="home__hero__content">
          <Motion
            elem="p"
            duration="1.5"
            className="home__hero__content__mainText"
          >
            Capture memories. Make your birthdays much more fun.
          </Motion>
          {!globalState.state.loggedIn && (
            <Motion
              elem="div"
              duration="2"
              className="home__hero__content__button"
            >
              <Link to="/signup">
                <Button size="md">Join Now</Button>
              </Link>
            </Motion>
          )}
        </div>
      </div>
      <div className="home__showcase">
        <Motion elem="img" duration="1.5" src={Baby1} alt="ribbon"></Motion>
        <Motion elem="img" duration="2" src={Guy1} alt="ribbon"></Motion>
        <Motion elem="img" duration="1" src={Girl1} alt="ribbon"></Motion>
        <Motion elem="img" duration=".5" src={Guy2} alt="ribbon"></Motion>
      </div>
    </div>
  );
};

export default Home;
