import { Home } from "@/components/views/home/Home";
import { CreateSurvey } from "@/components/views/surveys/create/CreateSurvey";
import { SurveyDetails } from "@/components/views/surveys/details/SurveyDetails";
import { SurveyRespond } from "@/components/views/surveys/respond/SurveyRespond";
import { ResponseThanks } from "@/components/views/surveys/ResponseThanks";
import { Redirect, Route, Switch, useLocation } from "wouter";
import { useAuth } from "@/components/AuthContext";
import { useMemo } from "react";
import { Authenticate } from "@/components/views/authenticate/Authenticate";
import { Spinner } from "@/components/ui/Spinner";
import { Page } from "@/components/Page";
import { authenticatePath } from "@/components/views/authenticate/utils";
import { Terms } from "@/components/views/terms/Terms";
import { NotFound } from "@/components/views/errors/NotFound";
import { Privacy } from "@/components/views/privacy/Privacy";
import { Profile } from "@/components/views/profile/Profile";
import { ListSurveys } from "@/components/views/surveys/list/ListSurveys";

export function Routes() {
  const {signedIn} = useAuth();
  const [location] = useLocation();

  const surveyRoutes = useAuthenticatedRoutes(signedIn, location, (
    <Switch>
      <Route path="/create" component={CreateSurvey} />
      <Route path="/:id" nest>
        {params => {
          const {id} = params;
          const surveyId = Number(id);
          if (isNaN(surveyId)) {
            return <NotFound />;
          }
          return (
            <Switch>
              <Route path="/"><SurveyDetails id={surveyId}/></Route>
              <Route path="/respond"><SurveyRespond id={surveyId}/></Route>
              <Route path="/thanks"><ResponseThanks /></Route>
              <Redirect to="/" />
            </Switch>
          );
        }}
      </Route>
      <Route path="/" component={ListSurveys} />
      <Redirect to="/" />
    </Switch>
  ));
  const profileRoute = useAuthenticatedRoutes(signedIn, location, <Profile />);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/authenticate" component={Authenticate} />

      <Route path="/surveys" nest>{surveyRoutes}</Route>
      <Route path="/profile">{profileRoute}</Route>

      <Route path="404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function useAuthenticatedRoutes(signedIn: boolean | undefined, location: string, routes: JSX.Element) {
  return useMemo(() => {
    if (signedIn === undefined) {
      return <Page><Spinner /></Page>;
    } else if (!signedIn) {
      return <Redirect to={'~'+authenticatePath(location)} replace />;
    }
    return routes;
  }, [location, signedIn, routes]);
}
