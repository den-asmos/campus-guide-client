import { cn } from "@/lib/utils";

type Props = {
	color?: "default" | "primary";
};

const Loader = ({ color = "default" }: Props) => {
	return (
		<div
			className={cn(
				"w-2.5 h-2.5 rounded-full block my-4 mx-auto relative bg-transparent -left-1/3 box-border animate-loading",
				color === "default" ? "text-white" : "text-button-primary"
			)}
		></div>
	);
};

export default Loader;
