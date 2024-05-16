import { Page } from "@/components/layout/Page";
import { getApiClient } from "@/lib/api_client";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "wouter";

const api = getApiClient();

export function SurveyDetails() {
	const routeParams = useParams();
	const [voteCount, setVoteCount] = useState(0);
	const [survey, setSurvey] = useState<any | null>(null);
	const [results, setResults] = useState<any[] | null>(null);

	const fetchSurvey = useCallback(async (id: number) => {
		const surveyResp = await api.get(`/surveys/${id}`);
		setSurvey(surveyResp);
	}, []);

	const fetchSurveyResult = useCallback(async (id: number) => {
		const resultsResp = await api.get(`/surveys/${id}/results`);
		setVoteCount(resultsResp?.response_count || 0);
		setResults(resultsResp?.option_results);
	}, []);

	useEffect(() => {
		if (routeParams?.id && !results) {
			try {
				const surveyId = Number(routeParams.id);
				fetchSurvey(surveyId);
				fetchSurveyResult(surveyId);
			} catch (err) {
				console.error(err);
			}
		}
	}, [fetchSurveyResult, fetchSurvey, results, routeParams?.id]);

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
