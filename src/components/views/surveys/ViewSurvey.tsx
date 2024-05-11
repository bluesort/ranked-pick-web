import { useApi } from "@/components/ApiContext";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "wouter";

export function ViewSurvey() {
	const routeParams = useParams();
  const { apiGet } = useApi();
  // const [loading, setLoading] = useState(false);
	const [survey, setSurvey] = useState<any>(null);
  // const [surveyOptions, setSurveyOptions] = useState(survey.options ?? []);

	const fetchSurvey = useCallback(async (id: number) => {
		const survey = await apiGet(`/surveys/${id}`);
		setSurvey(survey);
	}, [apiGet]);

	// TODO: Fix double fetch
	useEffect(() => {
		if (routeParams?.id && !survey) {
			try {
				fetchSurvey(Number(routeParams.id));
			} catch (err) {
				console.error(err);
			}
		}
	}, [fetchSurvey, routeParams?.id, survey]);

  // const onOptionChange = (index: number, newOption: string) => {
  //   const optionsCopy = [...surveyOptions];
  //   optionsCopy[index] = newOption;
  //   setSurveyOptions(optionsCopy);
  // };

  // const onOptionAdd = () => {
  //   setSurveyOptions([...surveyOptions, ""]);
  // };

  // const onOptionDelete = (index: number) => {
  //   const optionsCopy = [...surveyOptions];
  //   optionsCopy.splice(index, 1);
  //   setSurveyOptions(optionsCopy);
  // };

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
		</div>
  );
}
