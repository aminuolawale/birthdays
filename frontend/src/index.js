import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "./store";

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  console.log("token", token);
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  // uri: "http://localhost:8000/graphql",
  link: authLink.concat(httpLink),
  cache: cache,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <StateProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StateProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
