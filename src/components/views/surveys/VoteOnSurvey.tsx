import { useApi } from "@/components/ApiContext";
import { Button } from "@/components/ui/Button";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "wouter";

export function VoteOnSurvey() {
	const routeParams = useParams();
  const { apiGet, apiPost } = useApi();
	const [survey, setSurvey] = useState<any>(null);
  const [surveyOptions, setSurveyOptions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);
  // TODO: loading state

	const fetchSurvey = useCallback(async (id: number) => {
		const surveyResp = await apiGet(`/surveys/${id}`);
		setSurvey(surveyResp);
	}, [apiGet]);

  const fetchSurveyOptions = useCallback(async (surveyId: number) => {
    const optionsResp = await apiGet(`/surveys/${surveyId}/options`);
    setSurveyOptions(optionsResp as any[]);
  }, [apiGet]);

  const handleMoveOptionUp = (optionsIndex: number) => {
    if (optionsIndex == 0) { return; }
    const newOptions = [...surveyOptions];
    newOptions[optionsIndex - 1] = surveyOptions[optionsIndex];
    newOptions[optionsIndex] = surveyOptions[optionsIndex - 1];
    setSurveyOptions(newOptions);
  };

  const handleMoveOptionDown = (optionsIndex: number) => {
    if (optionsIndex == surveyOptions.length - 1) { return; }
    const newOptions = [...surveyOptions];
    newOptions[optionsIndex + 1] = surveyOptions[optionsIndex];
    newOptions[optionsIndex] = surveyOptions[optionsIndex + 1];
    setSurveyOptions(newOptions);
  };

  const handleSubmit = async () => {
    try {
      await apiPost(`/surveys/${survey.id}/vote`, {
        options: surveyOptions.map(o => o.id),
      });
      setVoted(true);
    } catch (err) {
      if (typeof(err) === 'string') {
        setError(err);
      } else {
        console.error(err);
        setError('Something went wrong');
      }
    }
  };

	// TODO: Fix double fetch
	useEffect(() => {
		if (routeParams?.id && !survey) {
			try {
        const surveyId = Number(routeParams.id);
				fetchSurvey(surveyId);
        fetchSurveyOptions(surveyId);
			} catch (err) {
				console.error(err);
			}
		}
	}, [fetchSurvey, fetchSurveyOptions, routeParams?.id, survey]);

  // TODO: Use form
  return (
    <div>
      <h1 className="mb-4">{survey?.title}</h1>
      {voted ? (
        <div>Thank you for voting</div>
      ):(
        <div>
          {error && <p className="text-red-800 mb-4 first-letter:uppercase">{error}</p>}
          {/* TODO: show results */}
          {surveyOptions.map((option, index) => (
            <div key={index} className="[&>*]:mb-2 flex items-center">
              <Button onClick={() => handleMoveOptionUp(index)} className="mr-1">Up</Button>
              <Button onClick={() => handleMoveOptionDown(index)} className="mr-2">Down</Button>
              <div>{option.title}</div>
            </div>
          ))}
          <div className="font-semibold my-4">You will not be able to change your submission once you vote.</div>
          <Button onClick={handleSubmit}>Vote</Button>
        </div>
      )}
		</div>
  );
}
