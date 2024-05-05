interface Props {
	size?: string;
	borderSize?: string;
	className?: string;
}

export function Spinner({ size = "4", borderSize = "2", className }: Props) {
	return (
		<div className={
			`h-${size} w-${size} animate-spin rounded-full border-${borderSize} border-solid border-current border-e-transparent align-[-0.125em] ${className}`
		}>
		</div>
	);
}
