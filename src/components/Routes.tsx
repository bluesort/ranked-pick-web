import { Home } from "@/components/views/home/Home";
import { NewSurvey } from "@/components/views/surveys/NewSurvey";
import { ViewSurvey } from "@/components/views/surveys/ViewSurvey";
import { Route, Switch } from "wouter";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      <Route path="/surveys/new" component={NewSurvey} />
      <Route path="/surveys/:id" component={ViewSurvey} />

      <Route>404 Placeholder</Route>
    </Switch>
  );
}

export default Routes;
