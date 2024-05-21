import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

interface Props {
	open: boolean;
	setOpen: (open: boolean) => void;
	onConfirm: () => void;
	destructiveConfirm?: boolean;
	title?: string;
	description?: string;
	confirmLabel?: string
}

export function ConfirmationDialog({
	open,
	setOpen,
	onConfirm,
	destructiveConfirm,
	title = "Are you sure?",
	description = "This action cannot be undone.",
	confirmLabel = "Confirm"
}: Props) {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					{title}
				</DialogHeader>
				<DialogDescription>
					{description}
				</DialogDescription>
				<DialogFooter>
					<Button onClick={() => setOpen(false)} variant="secondary" className="mr-2">
						Cancel
					</Button>
					<Button onClick={onConfirm} variant={destructiveConfirm ? 'destructive' : 'default'}>
						{confirmLabel}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
