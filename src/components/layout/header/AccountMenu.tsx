import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import clsx from "clsx";
import { FiUserCheck, FiUserX } from "react-icons/fi";
import { useCallback } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/components/AuthContext";
import { authenticatePath } from "@/components/views/authenticate/utils";

interface Props {
	triggerClassName?: string;
}

export function AccountMenu({ triggerClassName }: Props) {
	const { currentUser, signout } = useAuth();
	const [location, setLocation] = useLocation();

	const handleAuthenticate = useCallback(() => {
		setLocation(authenticatePath(location));
	}, [location, setLocation]);

	const handleMenuSelect = useCallback(async (selectedItem: string) => {
		switch (selectedItem) {
			case 'profile':
				setLocation('/profile');
				break;
			case 'signout':
				await signout();
				// TODO: Show toast on signout
				break;
			default:
				console.error('Unknown auth menu item selected: ', selectedItem);
		}
	}, [setLocation, signout]);

	return (
		<>
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
						onClick={handleAuthenticate}
						className={clsx(triggerClassName)}
						variant="ghost"
					>
						<FiUserX size="20" />
					</Button>
				</>
			)}
		</>
	);
}
