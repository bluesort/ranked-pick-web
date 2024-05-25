import { useAuth } from "@/components/AuthContext";
import { Page } from "@/components/Page";
import { Separator } from "@/components/ui/Separator";
import { CreatedSurveys } from "@/components/views/surveys/list/CreatedSurveys";
import { RespondedSurveys } from "@/components/views/surveys/list/RespondedSurveys";
import { getApiClient } from "@/lib/api-client";
import { useCallback, useEffect, useState } from "react";

export function ListSurveys() {
	const { currentUser } = useAuth();
	const [createdSurveys, setCreatedSurveys] = useState([]);
	const [respondedSurveys, setRespondedSurveys] = useState([]);

	const fetchSurveys = useCallback(async () => {
		const createdResp = await api.get(`/users/${currentUser?.id}/created_surveys`);
		setCreatedSurveys(createdResp || []);
		const respondedResp = await api.get(`/users/${currentUser?.id}/responded_surveys`);
		setRespondedSurveys(respondedResp || []);
	}, [currentUser?.id]);

	useEffect(() => {
		fetchSurveys();
	}, [fetchSurveys]);

	return (
		<Page title="Surveys">
			{!createdSurveys?.length && !respondedSurveys?.length && (
				<div className="flex justify-center text-muted-foreground">
					You have not created or responded to any surveys.
				</div>
			)}
			{!!createdSurveys?.length && (
				<>
					<h3>Created</h3>
					<CreatedSurveys surveys={createdSurveys} refetchSurveys={fetchSurveys} />
				</>
			)}
			{!!createdSurveys?.length && !!respondedSurveys?.length && <Separator className="my-8" />}
			{!!respondedSurveys?.length && (
				<>
					<h3>Responded To</h3>
					<RespondedSurveys surveys={respondedSurveys} />
				</>
			)}
		</Page>
	);
}

const api = getApiClient();
