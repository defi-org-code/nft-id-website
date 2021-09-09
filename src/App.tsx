import React from "react";
import "./styles/index.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./screens/Home";
import Asset from "./screens/Asset";
const routes = {
  home: "/",
  asset: ["/:twitterHandle", "/:contractAddress/:tokenId"],
};
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.asset} component={Asset} />
        <Route render={() => <Redirect to={routes.home} />} />
      </Switch>
    </div>
  );
}

export default App;
