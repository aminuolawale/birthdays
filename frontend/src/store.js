import React, { createContext, useReducer } from "react";

const initialState = {
  loggedIn: !!localStorage.getItem("token"),
  userThumb: localStorage.getItem("userThumb"),
  verified: false,
};

export const store = createContext(initialState);

const { Provider } = store;

export const StateProvider = ({ children }) => {
  let newState;
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "LOGIN_SUCCESS":
        const token = action.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("userThumb", action.data.userThumb);
        newState = { ...state, ...action.data, loggedIn: true };
        return newState;
      case "LOGOUT_SUCCESS":
        localStorage.setItem("token", "");
        localStorage.setItem("userThumb", "");

        newState = {
          ...state,
          loggedIn: false,
          userThumb: null,
          verified: null,
        };
        return newState;
      case "UPDATE_MEDIA_SUCCESS":
        localStorage.setItem("userThumb", action.data);
        newState = {
          ...state,
          userThumb: action.data,
        };
        return newState;
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
