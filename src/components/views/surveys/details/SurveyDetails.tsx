import { useAuth } from "@/components/AuthContext";
import { Page } from "@/components/Page";
import { Results } from "@/components/views/surveys/details/Results";
import { getApiClient } from "@/lib/api-client";
import { pluralize } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { LiaVoteYeaSolid } from "react-icons/lia";
import { Button } from "@/components/ui/Button";
import { useLocation } from "wouter";

interface Props {
	id: number;
}

export function SurveyDetails({ id }: Props) {
	const {currentUser} = useAuth();
	const [survey, setSurvey] = useState<any | null>(null);
	const[,setLocation] = useLocation();

	const fetchSurvey = useCallback(async (id: number) => {
		const resp = await api.get(`/surveys/${id}`);
		setSurvey(resp);
	}, []);

	const handleVote = useCallback(() => {
		setLocation('/respond');
	}, [setLocation]);

	useEffect(() => {
		if (!survey) {
			fetchSurvey(id);
		}
	}, [survey, fetchSurvey, id]);

	// TODO: Edit survey
	return (
		<Page title={survey?.title}>
			<p className="mb-6"></p>
			{survey?.description && (
        <p className="mb-6">{survey.description}</p>
      )}
			<div className="mb-4 w-full flex justify-between items-center">
				<Button onClick={handleVote} className="text-lg" role="link">
					<LiaVoteYeaSolid size="30" className="mr-2" />
					Vote
				</Button>
				<div className="mt-2">You have not voted</div>
				<div className="flex">
					<div className="font-bold mr-1 text-2xl">{survey?.response_count || 0}</div>
					<div className="mt-2">{pluralize(survey?.response_count, 'response', 'responses')}</div>
				</div>
			</div>
			{currentUser?.id == survey?.user_id && (
				<Results survey={survey} />
			)}
		</Page>
	);
}

const api = getApiClient();
