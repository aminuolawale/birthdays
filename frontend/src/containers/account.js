import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ME } from "../graph-ql/schema";

const Account = () => {
  const { loading, error, data } = useQuery(ME);
  if (loading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>There was an error</div>;
  }

  return <div>{data.me.result.fullName}</div>;
};

export default Account;
