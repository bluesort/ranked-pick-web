import { useAuth } from "@/components/AuthContext";
import { Page } from "@/components/Page";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { getApiClient } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { FiEdit3, FiX } from "react-icons/fi";

export function Profile() {
	const { currentUser, setCurrentUser } = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const [username, setUsername] = useState(currentUser?.username);
	const [displayName, setDisplayName] = useState(currentUser?.display_name);

	const handleSubmit = async () => {
		if (!isEditing) { return; }
		const user = await api.put(`/users/${currentUser?.id}`, {
			username,
			display_name: displayName,
		});
		setIsEditing(false);
		setCurrentUser(user);
	};

	useEffect(() => {
		if (!isEditing) {
			setUsername(currentUser?.username);
			setDisplayName(currentUser?.display_name);
		}
	}, [isEditing, currentUser?.display_name, currentUser?.username]);

	if (!currentUser) { return; }
	return (
		<Page size="sm" title={(
			<div className="flex justify-between items-center mb-4">
				<h2>Profile</h2>
				<Button
					variant="outline"
					onClick={() => setIsEditing(!isEditing)}
					className="h-10 w-10 p-0"
					aria-label={isEditing ? "Cancel editing" : "Edit profile"}
				>
					{isEditing ?
						<FiX size="20" /> :
						<FiEdit3 size="20" />
					}
				</Button>
			</div>
		)}>
			{isEditing ? (
				<Form onSubmit={handleSubmit} className="[&>*]:mb-4">
					<Label htmlFor="username">Username</Label>
					<Input
						id="username"
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
					<Label htmlFor="display-name">Display Name</Label>
					<Input
						id="display-name"
						value={displayName || undefined}
						onChange={e => setDisplayName(e.target.value)}
					/>
				</Form>
			):(
				<>
					<dl className="py-1.5 [&>dd]:h-11 [&>dd]:flex [&>dd]:items-center [&>dd]:mb-4">
						<dt>Username</dt>
						<dd>{currentUser.username}</dd>

						<dt>Display Name</dt>
						<dd>{currentUser.display_name || '-'}</dd>
					</dl>
				</>
			)}
		</Page>
	);
}

const api = getApiClient();
