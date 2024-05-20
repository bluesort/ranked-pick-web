import { Page } from "@/components/Page";
import { Spinner } from "@/components/ui/Spinner";
import { VoteForm } from "@/components/views/surveys/respond/VoteForm";
import { useSurveyRoute } from "@/components/views/surveys/use-survey-route";

interface Props {
	id: number;
}

export function Respond({id}: Props) {
	const survey = useSurveyRoute(id);

	if (!survey) { return <Page><Spinner /></Page>; }

  // TODO: Check survey state for response
  return (
    <Page title={survey?.title}>
			{survey?.description && (
        <p className="my-6">{survey.description}</p>
      )}
      <VoteForm survey={survey} />
		</Page>
  );
}
