import { useApi } from "@/components/ApiContext";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "wouter";

export function ViewSurvey() {
	const routeParams = useParams();
  const { apiGet } = useApi();
  // const [loading, setLoading] = useState(false);
	const [survey, setSurvey] = useState<any>(null);
  const [surveyOptions, setSurveyOptions] = useState<string[]>([]);

	const fetchSurvey = useCallback(async (id: number) => {
		const surveyResp = await apiGet(`/surveys/${id}`);
		setSurvey(surveyResp);
	}, [apiGet]);

  const fetchSurveyOptions = useCallback(async (surveyId: number) => {
    const optionsResp = await apiGet(`/surveys/${surveyId}/options`);
    setSurveyOptions(optionsResp as string[]);
  }, [apiGet]);

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

  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     await apiPut(`/surveys/${survey.id}`, { options: surveyOptions });
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div>
			survey view {survey?.title}
      {surveyOptions.map((option, index) => (
        <div key={index}>{option}</div>
      ))}
		</div>
  );
}
