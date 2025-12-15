import { cn } from "@/lib/utils";
import type { ReactElement } from "react";

type Props = {
	children: ReactElement | ReactElement[];
	className?: string;
};

const Layout = ({ children, className }: Props) => {
	return (
		<main
			className={cn("p-4 flex-1 flex flex-col w-full bg-background", className)}
		>
			{children}
		</main>
	);
};

export default Layout;
