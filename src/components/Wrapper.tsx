import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
	className?: string;
}>;

const Wrapper = ({ className, children }: Props) => {
	return (
		<div className={cn("flex flex-col min-h-screen", className)}>
			{children}
		</div>
	);
};

export default Wrapper;
