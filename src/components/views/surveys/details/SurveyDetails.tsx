import { useAuth } from "@/components/AuthContext";
import { Page } from "@/components/Page";
import { Results } from "@/components/views/surveys/details/Results";
import { getApiClient } from "@/lib/api-client";
import { useCallback, useEffect, useState } from "react";

interface Props {
	id: number;
}

export function SurveyDetails({ id }: Props) {
	const {currentUser} = useAuth();
	const [survey, setSurvey] = useState<any | null>(null);

	const fetchSurvey = useCallback(async (id: number) => {
		const resp = await api.get(`/surveys/${id}`);
		setSurvey(resp);
	}, []);

	useEffect(() => {
		if (!survey) {
			fetchSurvey(id);
		}
	}, [survey, fetchSurvey, id]);

	console.log(currentUser?.id, survey?.user_id);
	return (
		<Page title={survey?.title}>
			{currentUser?.id == survey?.user_id && (
				<Results survey={survey} />
			)}

		</Page>
	);
}

const api = getApiClient();
