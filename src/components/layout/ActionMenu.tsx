import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/DropdownMenu";
import clsx from "clsx";
import { useCallback } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useLocation } from "wouter";

type Props = {
	triggerClassName?: string;
}

export function ActionMenu({ triggerClassName }: Props) {
	const [, setLocation] = useLocation();

	const handleMenuSelect = useCallback(async (selectedItem: string) => {
		switch (selectedItem) {
			case 'new_survey':
				setLocation('/profile');
				break;
			default:
				console.error('Unknown auth menu item selected: ', selectedItem);
		}
	}, [setLocation]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={clsx(triggerClassName, 'mr-2 hover:brightness-100')}>
				<FiMoreVertical size="20" />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onSelect={() => handleMenuSelect('new_survey')}>New Survey</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
