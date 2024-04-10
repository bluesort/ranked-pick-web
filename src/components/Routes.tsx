import { Route, Switch } from "wouter";

function Routes() {
  return (
    <Switch>
      <Route path="/">home route</Route>
      <Route>404 Placeholder</Route>
    </Switch>
  );
}

export default Routes;
