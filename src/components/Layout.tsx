import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
	className?: string;
}>;

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
