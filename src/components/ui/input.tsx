import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import { inputVariants } from "./variants";

function Input({
	className,
	type,
	...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(inputVariants(), className)}
			{...props}
		/>
	);
}

export { Input };
