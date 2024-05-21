import { pluralize } from "@/lib/utils";

export function ResponseCount({responseCount}: {responseCount: number}) {
	return (
		<div className="flex">
			<div className="font-bold mr-1 text-2xl">{responseCount || 0}</div>
			<div className="mt-1.5">{pluralize(responseCount, 'response', 'responses')}</div>
		</div>
	);
}
