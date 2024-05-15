import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { Spinner } from "@/components/ui/Spinner";
import { capitalize } from "@/lib/utils";
import { useCallback, useState } from "react";

interface Props {
	children: React.ReactNode;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	error?: string;
	onCancel?: () => void;
	submitLabel?: string;
}

export function Form({ children, onSubmit, error, onCancel, submitLabel = 'Submit' }: Props) {
	const [loading, setLoading] = useState(false);
	const [apiError, setApiError] = useState<string | null>(null);

	const handleClearError = useCallback(() => {
		setApiError(null);
	}, []);

	const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			await onSubmit(e);
			setApiError(null);
		} catch (err) {
			if (typeof(err) === 'string') {
				setApiError(err);
			} else {
				console.error(err);
				setApiError('Something went wrong');
			}
		} finally {
			setLoading(false);
		}
	}, [onSubmit]);

	const errorString = error ? capitalize(error) : apiError ? capitalize(apiError) : null;
	return (
		<form onSubmit={handleSubmit} onKeyDown={handleClearError}>
			{children}
			{errorString ? (
				<div className="flex justify-center items-center bg-error text-error-foreground font-bold p-2 h-10 rounded-md my-4 first-letter:uppercase">
					{errorString}
				</div>
			) : (
				<div className="h-10 my-4"></div>
			)}
			<Separator />
			<div className="flex justify-end items-center mt-4">
				<Spinner visible={loading} className="mr-4" />
				{onCancel && <Button onClick={onCancel}>Cancel</Button>}
				<Button type="submit" className="w-20">
					{submitLabel}
				</Button>
			</div>
		</form>
	);
}
