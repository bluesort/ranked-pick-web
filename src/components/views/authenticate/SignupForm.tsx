import { useCallback, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";
import { useAuth } from "@/components/AuthContext";
import { Form } from "@/components/ui/form/Form";

interface Props {
	onComplete: () => void;
}

export function SignupForm({ onComplete }: Props) {
	const { signup } = useAuth();
	const [error, setError] = useState<string | null>(null);
	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [acceptedTos, setAcceptedTos] = useState(false);

	const handlePasswordConfirmationUpdate = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setPasswordConfirmation(value);
		if (password && value && value != password) {
			setError("Password confirmation does not match");
		} else {
			setError(null);
		}
	}, [password]);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password != passwordConfirmation) {
			setError("Password confirmation does not match");
			return;
		}

		await signup({
			email: email,
			password: password,
			display_name: displayName,
			password_confirmation: passwordConfirmation,
			accepted_tos: acceptedTos,
		});
		onComplete();
	};

	return (
		<Form onSubmit={onSubmit} error={error} submitLabel="Sign Up">
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
				onChange={handlePasswordConfirmationUpdate}
				required
			/>

			<div className="flex mt-6">
				<Checkbox id="acceptedtos" checked={acceptedTos} onCheckedChange={checked => setAcceptedTos(checked as boolean)} required />
				<Label htmlFor="acceptedtos" className="ml-2">
					I accept the
					<a href="/terms" target="_blank" className="ml-1">Terms of Service</a>
				</Label>
			</div>
		</Form>
	);
}
