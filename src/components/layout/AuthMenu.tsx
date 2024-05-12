import { useApi } from "@/components/ApiContext";
import { AuthDialog } from "@/components/dialogs/auth/AuthDialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import clsx from "clsx";
import { FiUserCheck, FiUserX } from "react-icons/fi";
import { useCallback, useState } from "react";
import { useLocation } from "wouter";

type Props = {
	triggerClassName?: string;
}

export function AuthMenu({ triggerClassName }: Props) {
	const { currentUser, signout } = useApi();
	const [, setLocation] = useLocation();
	const [authDialogOpen, setAuthDialogOpen] = useState(false);

	const handleMenuSelect = useCallback(async (selectedItem: string) => {
		switch (selectedItem) {
			case 'profile':
				setLocation('/profile');
				break;
			case 'signout':
				await signout();
				break;
			default:
				console.error('Unknown auth menu item selected: ', selectedItem);
		}
	}, [setLocation, signout]);

	return (
		<div>
			{currentUser ? (
				<DropdownMenu>
					<DropdownMenuTrigger className={clsx(triggerClassName)}>
						<FiUserCheck size="20" />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onSelect={() => handleMenuSelect('profile')}>Profile</DropdownMenuItem>
						<DropdownMenuItem onSelect={() => handleMenuSelect('signout')}>Sign Out</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			):(
				<>
					<Button
						onClick={() => setAuthDialogOpen(true)}
						className={clsx(triggerClassName)}
					>
						<FiUserX size="20" />
					</Button>
					<AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
				</>
			)}
		</div>
	);
}
