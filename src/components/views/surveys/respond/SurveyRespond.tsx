import { Page } from "@/components/Page";
import { Spinner } from "@/components/ui/Spinner";
import { VoteForm } from "@/components/views/surveys/respond/VoteForm";
import { useSurveyRoute } from "@/components/views/surveys/use-survey-route";

interface Props {
	id: number;
}

export function SurveyRespond({id}: Props) {
	const survey = useSurveyRoute(id);

	if (!survey) { return <Page center><Spinner /></Page>; }

  // TODO: Check survey state for response
  return (
    <Page title={survey?.title}>
			{survey?.description && (
        <div className="mb-6 flex justify-center">{survey?.description}</div>
      )}
      <VoteForm survey={survey} />
		</Page>
  );
}
