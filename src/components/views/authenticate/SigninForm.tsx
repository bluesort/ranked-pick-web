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
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await signin({username, password});
		onComplete();
	};

	return (
		<Form onSubmit={onSubmit} submitLabel="Sign In" className="[&>*]:mb-4">
			<Label htmlFor="username">Username</Label>
			<Input
				id="username"
				alt="username"
				value={username}
				onChange={e => setUsername(e.target.value)}
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
