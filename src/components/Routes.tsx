import { Home } from "@/components/views/home/Home";
import { NewSurvey } from "@/components/views/surveys/NewSurvey";
import { SurveyDetails } from "@/components/views/surveys/SurveyDetails";
import { Respond } from "@/components/views/surveys/respond/Respond";
import { ResponseThanks } from "@/components/views/surveys/ResponseThanks";
import { Redirect, Route, Switch, useLocation } from "wouter";
import { useAuth } from "@/components/AuthContext";
import { useMemo } from "react";
import { Authenticate } from "@/components/views/authenticate/Authenticate";
import { Spinner } from "@/components/ui/Spinner";
import { Page } from "@/components/layout/Page";
import { authenticatePath } from "@/components/views/authenticate/utils";
import { Terms } from "@/components/views/terms/Terms";
import { NotFound } from "@/components/views/errors/NotFound";

function Routes() {
  const {currentUser} = useAuth();
  const [location] = useLocation();

  const surveyRoutes = useMemo(() => {
    if (currentUser === undefined) {
      // App is still initializing
      return <Page><Spinner /></Page>;
    } else if (currentUser === null) {
      // User is signed out
      return <Redirect to={'~'+authenticatePath(location)} replace />;
    }
    return (
      <Switch>
        <Route path="/new" component={NewSurvey} />
        <Route path="/:id" component={SurveyDetails} />
        <Route path="/:id/respond" component={Respond} />
        <Route path="/:id/thanks" component={ResponseThanks} />
        <Route component={NotFound} />
      </Switch>
    );
  }, [currentUser, location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/terms" component={Terms} />
      <Route path="/authenticate" component={Authenticate} />
      <Route path="/surveys" nest>
        {surveyRoutes}
      </Route>
      <Route path="404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
