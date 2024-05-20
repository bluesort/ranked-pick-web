import { ApiError, getApiClient } from "@/lib/api-client";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "wouter";

interface Survey {
	id: number;
	title: string;
	response_count: number;
	user_id: number;
	description?: string;
}

export function useSurveyRoute(id: number) {
	const [survey, setSurvey] = useState<Survey>();
	const [, setLocation] = useLocation();

	const fetchSurvey = useCallback(async (id: number) => {
		try {
			const surveyResp = await api.get(`/surveys/${id}`);
			setSurvey(surveyResp);
		} catch (err) {
			if (err instanceof ApiError && err.status === 404) {
				setLocation('~/404');
				return;
			}
			console.error(err);
		}
	}, [setLocation]);

	useEffect(() => {
		if (id) {
			console.log('fetching survey');
			fetchSurvey(id);
		}
	}, [id, fetchSurvey]);

	return survey as Survey;
}

const api = getApiClient();
