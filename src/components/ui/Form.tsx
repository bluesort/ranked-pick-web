import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { Spinner } from "@/components/ui/Spinner";
import { capitalize } from "@/lib/utils";
import clsx from "clsx";
import { useCallback, useState } from "react";

interface Props {
	children: React.ReactNode;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	error?: string | null;
	onCancel?: () => void;
	className?: string;
	submitLabel?: string;
	footerSeparator?: boolean;
}

export function Form({ children, onSubmit, error, onCancel, className, submitLabel = 'Submit', footerSeparator = true }: Props) {
	const [loading, setLoading] = useState(false);
	const [apiError, setApiError] = useState<string | null>(null);

	const handleClearError = useCallback(() => {
		setApiError(null);
	}, []);

	// TODO: Catch auth error on failed refresh and redirect
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
		<form onSubmit={handleSubmit} onKeyDown={handleClearError} className={className}>
			{children}
			{errorString ? (
				<div className="flex justify-center items-center bg-error text-error-foreground font-bold p-2 h-10 rounded-md my-4 first-letter:uppercase">
					{errorString}
				</div>
			) : (
				<div className="h-10 my-4"></div>
			)}
			{footerSeparator && <Separator />}
			<div className="flex justify-end items-center mt-4">
				<Spinner visible={loading} className="mr-4" />
				{onCancel && <Button onClick={onCancel} aria-label="cancel">Cancel</Button>}
				<Button type="submit" className="w-20" aria-label="submit">
					{submitLabel}
				</Button>
			</div>
		</form>
	);
}
