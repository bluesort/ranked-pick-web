import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { Checkbox } from "@/components/ui/Checkbox";
import { useAuth } from "@/components/AuthContext";

interface Props {
	onComplete: () => void;
}

export function SignupForm({ onComplete }: Props) {
	const { signup } = useAuth();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [acceptedTos, setAcceptedTos] = useState(false);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password != passwordConfirmation) {
			setError("Password confirmation does not match");
			return;
		}

		setLoading(true);
		try {
			await signup({
				email: email,
				password: password,
				display_name: displayName,
				password_confirmation: passwordConfirmation,
				accepted_tos: acceptedTos,
			});
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

	// TODO: Form component w/ footer
	return (
		<form onSubmit={onSubmit} className="[&>*]:mb-4">
			{error && <p className="text-red-800 mb-4 first-letter:uppercase">{error}</p>}

			<Label htmlFor="displayname">Display Name (optional)</Label>
			<Input
				id="displayname"
				alt="display name"
				value={displayName}
				onChange={e => setDisplayName(e.target.value)}
			/>

			<Label htmlFor="email">Email</Label>
			<Input
				id="email"
				type="email"
				alt="email"
				value={email}
				onChange={e => setEmail(e.target.value)}
				required
			/>

			<Label htmlFor="password">Password</Label>
			<Input
				id="password"
				type="password"
				value={password}
				onChange={e => setPassword(e.target.value)}
				required
			/>

			<Label htmlFor="passwordconfirm">Confirm Password</Label>
			<Input
				id="passwordconfirm"
				type="password"
				value={passwordConfirmation}
				onChange={e => setPasswordConfirmation(e.target.value)}
				required
			/>

			<div className="flex">
				<Checkbox id="acceptedtos" checked={acceptedTos} onCheckedChange={checked => setAcceptedTos(checked as boolean)} required />
				<Label htmlFor="acceptedtos" className="ml-2">
					I accept the
					<a href="/terms" target="_blank" className="ml-1">Terms of Service</a>
				</Label>
			</div>

			<div className="flex justify-end mt-4">
				<Button type="submit" className="w-20">
						{loading ? <Spinner /> : "Submit"}
				</Button>
			</div>
		</form>
	);
}
