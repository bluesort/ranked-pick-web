import { useApi } from "@/components/ApiContext";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "wouter";


export function SurveyDetails() {
	const routeParams = useParams();
	const [voteCount, setVoteCount] = useState(0);
	const [results, setResults] = useState<any[] | null>(null);
	const { apiGet } = useApi();

	const fetchSurveyResult = useCallback(async (id: number) => {
		const resultsResp = await apiGet(`/surveys/${id}/results`);
		setVoteCount(resultsResp.vote_count);
		setResults(resultsResp.option_results);
	}, [apiGet]);

	useEffect(() => {
		if (routeParams?.id && !results) {
			try {
				const surveyId = Number(routeParams.id);
				fetchSurveyResult(surveyId);
			} catch (err) {
				console.error(err);
			}
		}
	}, [fetchSurveyResult, routeParams?.id, results]);

	return (
		<div>
			<div className="mb-4">{voteCount} votes</div>
			{results ? results.map((result: any, index: number) => (
				<div key={index}>
					{result.rank}-
					{result.title}
				</div>
			)):(
				<div>Awaiting results</div>
			)}
		</div>
	);
}
