import "./styles/index.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./screens/Home";
import Asset from "./screens/Asset";
import Verify from "./screens/Verify";
import { routes } from "./consts";
import analytics from "./services/analytics";
analytics.init();
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={routes.verify} component={Verify} />
        <Route exact path={routes.asset} component={Asset} />
        <Route exact path={routes.home} component={Home} />
        <Route render={() => <Redirect to={routes.home} />} />
      </Switch>
    </div>
  );
}

export default App;
