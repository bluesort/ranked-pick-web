import { Separator } from "@/components/ui/Separator";
import { getApiClient } from "@/lib/api-client";
import { useCallback, useEffect, useState } from "react";
import { BiSolidMedal } from "react-icons/bi";

interface Props {
	survey: any
}

export function Results({survey}: Props) {
	const [results, setResults] = useState<any[] | null>(null);

	const fetchSurveyResult = useCallback(async (id: number) => {
		const resultsResp = await api.get(`/surveys/${id}/results`);
		setResults(resultsResp?.option_results);
	}, []);

	useEffect(() => {
		if (survey && !results) {
			fetchSurveyResult(survey.id);
		}
	}, [survey, fetchSurveyResult, results]);

	return (
		<>
			<Separator className="my-4" />
			<h3 className="mb-4">Results</h3>
			{results ? results.map((result: any, index: number) => (
				<div key={index} className="flex w-full items-center">
					<div>{index+1}.</div>
					<div className="flex-grow ml-2 bg-gray-100 my-1 h-10 flex justify-between items-center px-2">
						{result.title}
						{index == 0 && <BiSolidMedal size="20" className="text-yellow-500" />}
						{index == 1 && <BiSolidMedal size="20" className="text-gray-400" />}
						{index == 2 && <BiSolidMedal size="20" className="text-amber-600" />}
					</div>
				</div>
			)):(
				<div>Awaiting results</div>
			)}
		</>
	);
}

const api = getApiClient();
