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

function Routes() {
  const {currentUser} = useAuth();
  const [location] = useLocation();

  const authenticatedRoutes = useMemo(() => {
    if (currentUser === undefined) {
      // App is still initializing
      return <Page><Spinner /></Page>;
    } else if (currentUser === null) {
      const redirectTo = location == '/authenticate' ? '/' : location;
      const authUrl = '/authenticate?'+new URLSearchParams({return_to: redirectTo}).toString();
      return <Redirect to={authUrl} replace />;
    }
    return (
      <>
        <Route path="/surveys/new" component={NewSurvey} />
        <Route path="/surveys/:id" component={SurveyDetails} />
        <Route path="/surveys/:id/respond" component={Respond} />
        <Route path="/surveys/:id/thanks" component={ResponseThanks} />
      </>
    );
  }, [currentUser, location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/authenticate" component={Authenticate} />
      {authenticatedRoutes}
      <Route>404 Placeholder</Route>
    </Switch>
  );
}

export default Routes;
