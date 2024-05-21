import { Button } from "@/components/ui/Button";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { SurveyCard } from "@/components/views/surveys/list/SurveyCard";
import { getApiClient } from "@/lib/api-client";
import { useCallback, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

interface Props {
	surveys: any[];
	refetchSurveys: () => void;
}

export function CreatedSurveys({surveys, refetchSurveys}: Props) {
	const [surveyToDelete, setSurveyToDelete] = useState<any | null>(null);

	const handleConfirmDelete = useCallback(async () => {
		if (!surveyToDelete) { return; }
		await api.delete(`/surveys/${surveyToDelete.id}`);
		setSurveyToDelete(false);
		refetchSurveys();
	}, [surveyToDelete, refetchSurveys]);

	return (
		<>
			{surveys.map((survey: any) => (
				<SurveyCard key={survey.id} survey={survey} actionSlot={(
					<Button onClick={() => setSurveyToDelete(survey)} variant="destructive" className="ml-4 w-10 h-10 p-0" aria-label="Delete survey">
						<FiTrash2 size="18" />
					</Button>
				)} />
			))}
			<ConfirmationDialog
				open={!!surveyToDelete}
				setOpen={() => setSurveyToDelete(null)}
				title="Delete Survey"
				description={`Are you sure you want to delete the survey "${surveyToDelete?.title}"? This cannot be undone.`}
				onConfirm={() => handleConfirmDelete()}
				destructiveConfirm
			/>
		</>
	);
}

const api = getApiClient();


