import { useApi } from "@/components/ApiContext";
import Page from "@/components/layout/Page";
import { VoteForm } from "@/components/views/surveys/respond/VoteForm";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "wouter";

export function Respond() {
	const routeParams = useParams();
  const { apiGet } = useApi();
	const [survey, setSurvey] = useState<any>(null);

	const fetchSurvey = useCallback(async (id: number) => {
		const surveyResp = await apiGet(`/surveys/${id}`);
		setSurvey(surveyResp);
	}, [apiGet]);

	// TODO: Fix double fetch
	useEffect(() => {
		if (routeParams?.id && !survey) {
			try {
        const surveyId = Number(routeParams.id);
				fetchSurvey(surveyId);
			} catch (err) {
				console.error(err);
			}
		}
	}, [fetchSurvey, survey, routeParams?.id]);

  // TODO: Check survey state for response
  return (
    <Page title={survey?.title}>
      <VoteForm survey={survey} />
		</Page>
  );
}
