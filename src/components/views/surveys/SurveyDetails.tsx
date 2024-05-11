import { useApi } from "@/components/ApiContext";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "wouter";


export function SurveyDetails() {
	const routeParams = useParams();
	const [voteCount, setVoteCount] = useState(0);
	const [survey, setSurvey] = useState<any | null>(null);
	const [results, setResults] = useState<any[] | null>(null);
	const { apiGet } = useApi();

	const fetchSurvey = useCallback(async (id: number) => {
		const surveyResp = await apiGet(`/surveys/${id}`);
		setSurvey(surveyResp);
	}, [apiGet]);

	const fetchSurveyResult = useCallback(async (id: number) => {
		const resultsResp = await apiGet(`/surveys/${id}/results`);
		setVoteCount(resultsResp.response_count);
		setResults(resultsResp.option_results);
	}, [apiGet]);

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
	}, [fetchSurveyResult, routeParams?.id, results]);

	return (
		<div>
			<h1 className="mb-4">{survey?.title}</h1>
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
		</div>
	);
}
