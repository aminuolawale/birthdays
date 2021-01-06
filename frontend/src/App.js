import Home from "./containers/home";
import { Route } from "react-router-dom";
import "./sass/main.scss";
import Layout from "./containers/layout";
import Signup from "./containers/signup";
import Login from "./containers/login";
import VerifyAccount from "./containers/verifyAccount";
import Account from "./containers/account";
import EditAccount from "./containers/editAccount";
import { CloudinaryContext } from "cloudinary-react";

function App() {
  return (
    <div>
      <CloudinaryContext cloudName="sndbxdiscovery">
        <Layout>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/signup" component={Signup}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route
            path="/verify_account/:token"
            component={VerifyAccount}
          ></Route>
          <Route exact path="/account" component={Account}></Route>
          <Route exact path="/edit_account" component={EditAccount}></Route>
        </Layout>
      </CloudinaryContext>
    </div>
  );
}

export default App;
