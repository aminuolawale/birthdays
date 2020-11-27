import Home from "./containers/home";
import { Route } from "react-router-dom";
import "./sass/main.scss";
import Layout from "./containers/layout";
import CreateBirthday from "./containers/createBirthday";
import { CloudinaryContext } from "cloudinary-react";

function App() {
  return (
    <div>
      <CloudinaryContext cloudName="sndbxdiscovery">
        <Layout>
          <Route exact path="/" component={Home}></Route>
          <Route
            exact
            path="/create_birthday"
            component={CreateBirthday}
          ></Route>
        </Layout>
      </CloudinaryContext>
    </div>
  );
}

export default App;
