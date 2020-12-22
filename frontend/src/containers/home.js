import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import CardGrid from "../components/CardGrid";

const Home = () => {
  return (
    <div className="home">
      <div className="home__bg"></div>
      <CardGrid></CardGrid>
      <Link to="/create_birthday">Add Birthday</Link>
    </div>
  );
};

export default Home;
