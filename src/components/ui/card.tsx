import { cn } from "@/lib/utils";
import { LessonType } from "@/services/timetable/types";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const cardVariants = cva(
	"bg-card text-card-foreground flex flex-col gap-3 rounded-xl border py-2 px-3 shadow-sm",
	{
		variants: {
			type: {
				[LessonType.lecture]:
					"rounded-l-none border-l-4 border-l-button-primary",
				[LessonType.practical]: "rounded-l-none border-l-4 border-l-chart-1",
				[LessonType.laboratory]: "rounded-l-none border-l-4 border-l-chart-3",
				[LessonType.offline]: "rounded-l-none border-l-4 border-l-chart-2",
				[LessonType.control]: "rounded-l-none border-l-4 border-l-chart-4",
				[LessonType.credit]: "rounded-l-none border-l-4 border-l-chart-4",
				[LessonType.other]: "rounded-l-none border-l-4 border-l-chart-5",
			},
		},
	}
);

function Card({
	className,
	type,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
	return (
		<div
			data-slot="card"
			className={cn(cardVariants({ type, className }))}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
				className
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn("leading-none font-semibold", className)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				className
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn("px-6", className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
			{...props}
		/>
	);
}

export {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
};
