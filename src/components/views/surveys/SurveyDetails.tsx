import { Page } from "@/components/layout/Page";
import { useSurveyRoute } from "@/components/views/surveys/useSurveyRoute";
import { getApiClient } from "@/lib/api_client";
import { useCallback, useEffect, useState } from "react";

const api = getApiClient();

export function SurveyDetails() {
	const [voteCount, setVoteCount] = useState(0);
	const [results, setResults] = useState<any[] | null>(null);
	const {survey} = useSurveyRoute();

	const fetchSurveyResult = useCallback(async (id: number) => {
		const resultsResp = await api.get(`/surveys/${id}/results`);
		setVoteCount(resultsResp?.response_count || 0);
		setResults(resultsResp?.option_results);
	}, []);

	useEffect(() => {
		if (survey && !results) {
			try {
				fetchSurveyResult(survey.id);
			} catch (err) {
				console.error(err);
			}
		}
	}, [survey, fetchSurveyResult, results]);

	return (
		<Page title={survey?.title}>
			<div className="mb-4">{voteCount} votes</div>
			Best
			<br /><br />
			{results ? results.map((result: any, index: number) => (
				<div key={index}>
					{result.rank}-
					{result.title}
				</div>
			)):(
				<div>Awaiting results</div>
			)}
			<br />
			Worst
		</Page>
	);
}
