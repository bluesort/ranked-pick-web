import { useAuth } from "@/components/AuthContext";
import { Page } from "@/components/Page";
import { Results } from "@/components/views/surveys/details/Results";
import { useCallback, useEffect, useState } from "react";
import { LiaVoteYeaSolid } from "react-icons/lia";
import { Button } from "@/components/ui/Button";
import { useLocation } from "wouter";
import { useSurveyRoute } from "@/components/views/surveys/use-survey-route";
import { Spinner } from "@/components/ui/Spinner";
import { ResponseCount } from "@/components/views/surveys/ResponseCount";
import { getApiClient } from "@/lib/api-client";

interface Props {
	id: number;
}

export function SurveyDetails({ id }: Props) {
	const {currentUser} = useAuth();
	const[,setLocation] = useLocation();
	const survey = useSurveyRoute(id);
	const [hasVoted, setHasVoted] = useState(false);

	const handleVote = useCallback(() => {
		setLocation('/respond');
	}, [setLocation]);

	const fetchUserResponses = useCallback(async () => {
		if (!currentUser) { return; }
		const resp = await api.get(`/surveys/${id}/responses`, {
			'user_id': currentUser.id.toString(),
		});
		if (resp?.length > 0) { setHasVoted(true); }
	}, [currentUser, id]);

	useEffect(() => {
		fetchUserResponses();
	}, [fetchUserResponses]);

	// TODO: Loading page component
	if (!survey) { return <Page><Spinner /></Page>; }

	return (
		<Page title={survey?.title}>
			{survey?.description && (
        <div className="mb-6 flex justify-center">{survey?.description}</div>
      )}
			<div className="mb-4 w-full flex justify-between items-center">
				<ResponseCount responseCount={survey?.response_count} />
				<Button onClick={handleVote} className="text-lg" role="link">
					<LiaVoteYeaSolid size="30" className="mr-2" />
					{hasVoted ? 'Change Vote' : 'Vote'}
				</Button>
			</div>
			{currentUser?.id == survey?.user_id && (
				<Results survey={survey} />
			)}
		</Page>
	);
}

const api = getApiClient();
