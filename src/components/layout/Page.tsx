import clsx from "clsx";

interface Props {
	children: React.ReactNode;
	title?: string | React.ReactNode;
	center?: boolean;
	className?: string;
}


export default function Page({ children, title, center, className }: Props) {
	return (
		<div className={clsx('min-w-80', center && 'flex flex-col items-center', className)}>
			{title && <h1 className="mb-8">{title}</h1>}
			{children}
		</div>
	);
}
