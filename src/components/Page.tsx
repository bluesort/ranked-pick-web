import clsx from "clsx";
import { useMemo } from "react";

interface Props {
	children: React.ReactNode;
	title?: string | React.ReactNode;
	center?: boolean;
	className?: string;
	headerSize?: 1 | 2 | 3;
}

export function Page({ children, title, center, className, headerSize = 2 }: Props) {
	const header = useMemo(() => {
		if (!title) { return null; }
		if (typeof(title) != 'string') {
			return title;
		}
		const headerClasses = 'mb-6 tracking-wide';
		switch(headerSize) {
			case 1:
				return <h1 className={headerClasses}>{title}</h1>;
			case 2:
				return <h2 className={headerClasses}>{title}</h2>;
			case 3:
				return <h3 className={headerClasses}>{title}</h3>;
		}
	}, [title, headerSize]);

	return (
		<div className={clsx('min-w-80 w-full max-w-[50rem]', center && 'flex flex-col items-center', className)}>
			{header}
			{children}
		</div>
	);
}
