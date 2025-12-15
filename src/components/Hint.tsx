import { cn } from "@/lib/utils";
import { LessonType } from "@/services/timetable/types";
import { cva, type VariantProps } from "class-variance-authority";

const hintVariants = cva("p-2 font-medium text-sm leading-4 rounded-md", {
	variants: {
		type: {
			[LessonType.lecture]: "text-button-dark bg-chart-6",
			[LessonType.practical]: "bg-chart-1",
			[LessonType.laboratory]: "bg-chart-3",
			[LessonType.offline]: "bg-chart-2",
			[LessonType.control]: "bg-chart-4",
			[LessonType.credit]: "bg-chart-4",
			[LessonType.other]: "bg-chart-5",
		},
	},
	defaultVariants: {
		type: LessonType.lecture,
	},
});

type Props = React.ComponentProps<"div"> & VariantProps<typeof hintVariants>;

const Hint = ({ children, className, type, ...props }: Props) => {
	return (
		<div className={cn(hintVariants({ type, className }))} {...props}>
			{children}
		</div>
	);
};

export default Hint;
