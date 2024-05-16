import { getApiClient } from "@/lib/api_client";
import { isNumber } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";

const api = getApiClient();

export function useSurveyRoute() {
	const routeParams = useParams();
	const [survey, setSurvey] = useState<any | null>(null);
	const [, setLocation] = useLocation();

	const fetchSurvey = useCallback(async (id: number) => {
		const surveyResp = await api.get(`/surveys/${id}`);
		setSurvey(surveyResp);
	}, []);

	useEffect(() => {
		if (!isNumber(routeParams?.id)) {
			setLocation('~/404', {replace: true});
			return;
		}
		if (routeParams.id) {
			try {
				const surveyId = Number(routeParams.id);
				fetchSurvey(surveyId);
			} catch (err) {
				console.error(err);
			}
		}
	}, []);

	return { survey };
}
