import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useAuth } from "@/components/AuthContext";
import { Form } from "@/components/ui/Form";

interface Props {
	onComplete: () => void;
}

export function SigninForm({ onComplete }: Props) {
	const { signin } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await signin({email, password});
		onComplete();
	};

	return (
		<Form onSubmit={onSubmit} submitLabel="Sign In" className="[&>*]:mb-4">
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
		</Form>
	);
}
