import Home from "@/components/views/home/Home";
import NewSurvey from "@/components/views/surveys/new/NewSurvey";
import { Route, Switch } from "wouter";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      {/* <Route path="/surveys" component={AllOrders} /> */}
      <Route path="/surveys/new" component={NewSurvey} />
      {/* <Route path="/surveys/:id" component={AllOrders} /> */}

      <Route>404 Placeholder</Route>
    </Switch>
  );
}

export default Routes;
