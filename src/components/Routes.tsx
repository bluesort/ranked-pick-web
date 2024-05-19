import { Home } from "@/components/views/home/Home";
import { CreateSurvey } from "@/components/views/surveys/create/CreateSurvey";
import { SurveyDetails } from "@/components/views/surveys/details/SurveyDetails";
import { Respond } from "@/components/views/surveys/respond/Respond";
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

export function Routes() {
  const {signedIn} = useAuth();
  const [location] = useLocation();

  const surveyRoutes = useMemo(() => {
    if (signedIn === undefined) {
      return <Page><Spinner /></Page>;
    } else if (!signedIn) {
      return <Redirect to={'~'+authenticatePath(location)} replace />;
    }
    return (
      <Switch>
        <Route path="/new" component={CreateSurvey} />
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
                <Route path="/respond"><Respond id={surveyId}/></Route>
                <Route path="/thanks"><ResponseThanks /></Route>
                <Redirect to="/" />
              </Switch>
            );
          }}
        </Route>
        <Redirect to="~/" />
      </Switch>
    );
  }, [signedIn, location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/authenticate" component={Authenticate} />

      <Route path="/surveys" nest>{surveyRoutes}</Route>

      <Route path="404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}
