import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { useApi } from "@/components/ApiContext";

interface Props {
	onComplete: () => void;
}

export function SigninForm({ onComplete }: Props) {
	const { signin } = useApi();
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			await signin({email, password});
			onComplete();
		} catch (err) {
			if (typeof(err) === 'string') {
				setError(err);
			} else {
				setError('Something went wrong');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={onSubmit}>
			{error && <p className="text-red-800 mb-4 first-letter:uppercase">{error}</p>}

			<Label htmlFor="email">Email</Label>
			<Input
				id="email"
				type="email"
				alt="email"
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>

			<Label htmlFor="password">Password</Label>
			<Input
				id="password"
				type="password"
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>

			<div className="flex justify-end mt-4">
				<Button type="button" onClick={onComplete} className="mr-2">Cancel</Button>
				<Button type="submit" className="w-20">
						{loading ? <Spinner /> : "Submit"}
				</Button>
			</div>
		</form>
	);
}
