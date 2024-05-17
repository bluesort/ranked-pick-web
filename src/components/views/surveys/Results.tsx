import { getApiClient } from "@/lib/api-client";
import { useCallback, useEffect, useState } from "react";

interface Props {
	survey: any
}

export function Results({survey}: Props) {
	const [voteCount, setVoteCount] = useState(0);
	const [results, setResults] = useState<any[] | null>(null);

	const fetchSurveyResult = useCallback(async (id: number) => {
		const resultsResp = await api.get(`/surveys/${id}/results`);
		setVoteCount(resultsResp?.response_count || 0);
		setResults(resultsResp?.option_results);
	}, []);

	useEffect(() => {
		if (survey && !results) {
			fetchSurveyResult(survey.id);
		}
	}, [survey, fetchSurveyResult, results]);

	return (
		<div>
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

const api = getApiClient();
