import React from "react";
import BirthdayCard from "../components/BirthdayCard";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BIRTHDAYS } from "../graph-ql/schema";
import { Link } from "react-router-dom";
const Home = () => {
  const { loading, error, data } = useQuery(GET_BIRTHDAYS);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }
  if (data) {
    console.log(data);
    return (
      <div className="home">
        <div className="home__bg"></div>
        <div className="home__birthdaysList">
          {data.allBirthdays.map((b) => (
            <BirthdayCard key={b.id} data={b}></BirthdayCard>
          ))}
        </div>
        <Link to="/create_birthday">Add Birthday</Link>
      </div>
    );
  }
};

export default Home;
