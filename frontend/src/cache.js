import { makeVar } from "@apollo/client";

// const isLoggedInVar = makeVar(!!localStorage.getItem("token"));

const authUserVar = makeVar({
  loggedIn: !!localStorage.getItem("token"),
  userThumb: localStorage.getItem("userThumb"),
  verified: localStorage.getItem("verified"),
});

export { authUserVar };
