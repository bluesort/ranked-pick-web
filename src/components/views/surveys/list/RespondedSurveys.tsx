import { Button } from "@/components/ui/Button";
import { SurveyCard } from "@/components/views/surveys/list/SurveyCard";
import { useCallback } from "react";
import { FiEdit3 } from "react-icons/fi";
import { useLocation } from "wouter";

interface Props {
	surveys: any[];
}

export function RespondedSurveys({surveys}: Props) {
	const [,setLocation] = useLocation();

	const handleChangeVote = useCallback(async (id: number) => {
		setLocation(`/${id}/respond`);
	}, [setLocation]);

	return surveys.map((survey: any) => (
		<SurveyCard key={survey.id} survey={survey} actionSlot={(
			<Button onClick={() => handleChangeVote(survey.id)} className="ml-4 w-10 h-10 p-0" aria-label="Delete survey">
				<FiEdit3 size="20" />
			</Button>
		)} />
	));
}


