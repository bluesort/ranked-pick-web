import { ResponseCount } from "@/components/views/surveys/ResponseCount";
import { Link } from "wouter";

export function SurveyCard({ survey, actionSlot }: { survey: any, actionSlot: React.ReactNode }) {
	return (
		<div className="h-32 bg-gray-100 my-4 flex items-center justify-between p-4">
			<div className="truncate h-full py-3">
				<Link to={`~/surveys/${survey?.id}`} className="text-lg">{survey?.title}</Link>
				<div className="mt-2"><ResponseCount responseCount={survey?.response_count} /></div>
			</div>
			<div>
				{actionSlot}
			</div>
		</div>
	);
}
