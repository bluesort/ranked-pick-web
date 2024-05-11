import { Home } from "@/components/views/home/Home";
import { NewSurvey } from "@/components/views/surveys/NewSurvey";
import { SurveyDetails } from "@/components/views/surveys/SurveyDetails";
import { VoteOnSurvey } from "@/components/views/surveys/VoteOnSurvey";
import { Route, Switch } from "wouter";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      <Route path="/surveys/new" component={NewSurvey} />
      <Route path="/surveys/:id" component={SurveyDetails} />
      <Route path="/surveys/:id/vote" component={VoteOnSurvey} />

      <Route>404 Placeholder</Route>
    </Switch>
  );
}

export default Routes;
