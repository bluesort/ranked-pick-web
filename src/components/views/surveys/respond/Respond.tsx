import { Page } from "@/components/Page";
import { VoteForm } from "@/components/views/surveys/respond/VoteForm";
import { getApiClient } from "@/lib/api-client";
import { useState, useEffect, useCallback } from "react";

interface Props {
	id: number;
}

export function Respond({id}: Props) {
	const [survey, setSurvey] = useState<any>(null);

	const fetchSurvey = useCallback(async (id: number) => {
		const surveyResp = await api.get(`/surveys/${id}`);
		setSurvey(surveyResp);
	}, []);

	useEffect(() => {
		if (!survey) {
			fetchSurvey(id);
		}
	}, [survey, fetchSurvey, id]);

  // TODO: Check survey state for response
  return (
    <Page title={survey?.title}>
      <VoteForm survey={survey} />
		</Page>
  );
}

const api = getApiClient();
