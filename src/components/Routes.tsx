import { Home } from "@/components/views/home/Home";
import { NewSurvey } from "@/components/views/surveys/NewSurvey";
import { SurveyDetails } from "@/components/views/surveys/SurveyDetails";
import { Respond } from "@/components/views/surveys/respond/Respond";
import { ResponseThanks } from "@/components/views/surveys/ResponseThanks";
import { Route, Switch } from "wouter";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      <Route path="/surveys/new" component={NewSurvey} />
      <Route path="/surveys/:id" component={SurveyDetails} />
      <Route path="/surveys/:id/respond" component={Respond} />
      <Route path="/surveys/:id/thanks" component={ResponseThanks} />

      <Route>404 Placeholder</Route>
    </Switch>
  );
}

export default Routes;
