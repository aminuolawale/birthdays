import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import BirthdayCard from "../components/BirthdayCard";
import { GET_BIRTHDAYS } from "../graph-ql/schema";

const CardGrid = () => {
  const { loading, error, data } = useQuery(GET_BIRTHDAYS, {
    fetchPolicy: "no-cache",
  });
  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className="home__birthdaysList">
      {data.allBirthdays.map((b) => (
        <BirthdayCard key={b.id} data={b}></BirthdayCard>
      ))}
    </div>
  );
};

export default CardGrid;
