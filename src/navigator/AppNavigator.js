import { Route, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Home } from "../containers";

const history = createBrowserHistory();

const AppNavigator = () => {
  return (
    <BrowserRouter history={history}>
      <Route exact path="/" component={Home} />
    </BrowserRouter>
  );
};

export default AppNavigator;
