import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { useCallback, useState } from "react";

type FormProps = {
	children: React.ReactNode;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onCancel?: () => void;
	submitLabel?: string;
}

export function Form({ children, onSubmit, onCancel, submitLabel = 'Submit' }: FormProps) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleClearError = useCallback(() => {
		setError(null);
	}, []);

	const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			await onSubmit(e);
		} catch (err) {
			if (typeof(err) === 'string') {
				setError(err);
			} else {
				console.error(err);
				setError('Something went wrong');
			}
		} finally {
			setLoading(false);
		}
	}, [onSubmit]);

	return (
		<form onSubmit={handleSubmit} onKeyDown={handleClearError} className="[&>*]:my-2">
			{error && <p className="text-red-800 mb-4 first-letter:uppercase">{error}</p>}
			{children}
			<div className="flex justify-end">
				{onCancel && <Button onClick={onCancel}>Cancel</Button>}
				<Button type="submit" className="w-20">
						{loading ? <Spinner /> : submitLabel}
				</Button>
			</div>
		</form>
	);
}
