import Home from "./containers/home";
import { Route } from "react-router-dom";
import "./sass/main.scss";
import Layout from "./containers/layout";
import Signup from "./containers/signup";
import { CloudinaryContext } from "cloudinary-react";

function App() {
  return (
    <div>
      <CloudinaryContext cloudName="sndbxdiscovery">
        <Layout>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/signup" component={Signup}></Route>
        </Layout>
      </CloudinaryContext>
    </div>
  );
}

export default App;
