import clsx from "clsx";
import { useMemo } from "react";

interface Props {
	children: React.ReactNode;
	title?: string | React.ReactNode;
	center?: boolean;
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}

export function Page({ children, title, center, className, size = 'md' }: Props) {
	const maxWidthClass = useMemo(() => {
		switch(size) {
			case 'sm':
				return 'max-w-80';
			case 'md':
				return 'max-w-140';
			case 'lg':
				return 'max-w-200';
		}
	}, [size]);

	const header = useMemo(() => {
		if (!title) { return null; }
		if (typeof(title) != 'string') {
			return title;
		}
		return <h2 className="mb-6 tracking-wide">{title}</h2>;
	}, [title]);

	return (
		<div className={clsx('min-w-80 w-full', maxWidthClass, center && 'flex flex-col items-center', className)}>
			{header}
			{children}
		</div>
	);
}
