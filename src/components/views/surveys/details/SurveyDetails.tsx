import { useAuth } from "@/components/AuthContext";
import { Page } from "@/components/Page";
import { Results } from "@/components/views/surveys/details/Results";
import { pluralize } from "@/lib/utils";
import { useCallback } from "react";
import { LiaVoteYeaSolid } from "react-icons/lia";
import { Button } from "@/components/ui/Button";
import { useLocation } from "wouter";
import { useSurveyRoute } from "@/components/views/surveys/use-survey-route";
import { Spinner } from "@/components/ui/Spinner";

interface Props {
	id: number;
}

export function SurveyDetails({ id }: Props) {
	const {currentUser} = useAuth();
	const[,setLocation] = useLocation();
	const survey = useSurveyRoute(id);

	const handleVote = useCallback(() => {
		setLocation('/respond');
	}, [setLocation]);

	if (!survey) { return <Page><Spinner /></Page>; }

	// TODO: Edit survey
	return (
		<Page title={survey?.title}>
			<p className="mb-6"></p>
			{survey?.description && (
        <p className="mb-6">{survey?.description}</p>
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
