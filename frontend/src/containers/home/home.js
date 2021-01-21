import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { store } from "../../store";
import ImageGrid from "../../components/ImageGrid";
import * as style from "./style";

const Home = () => {
  const globalState = useContext(store);
  return (
    <style.Home>
      <style.Hero>
        <style.HeroContent>
          <style.MainText>
            Capture memories. Make your birthdays much more fun.
          </style.MainText>
          {!globalState.state.loggedIn && (
            <style.ButtonContainer>
              <Link to="/signup">
                <Button size="md">Join Now</Button>
              </Link>
            </style.ButtonContainer>
          )}
        </style.HeroContent>
      </style.Hero>
      <ImageGrid></ImageGrid>
    </style.Home>
  );
};

export default Home;
