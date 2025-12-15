import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type DrawerSelectOption = {
	label: string;
	value: string | number;
};

interface DrawerSelectProps<T extends DrawerSelectOption> {
	options: T[];
	placeholder: string;
	selectedOption: T | undefined;
	onChange: (option: T) => void;
	disabled?: boolean;
	displayedProperty?: "label" | "value";
}

const DrawerSelect = <T extends DrawerSelectOption>({
	options,
	placeholder,
	selectedOption,
	onChange,
	disabled,
	displayedProperty = "label",
}: DrawerSelectProps<T>) => {
	const isSelected = (option: T) => {
		return selectedOption?.value === option.value;
	};

	return (
		<Drawer>
			<DrawerTrigger disabled={disabled}>
				<div
					className={cn(
						"relative w-full text-left items-center border-input",
						disabled && "pointer-events-none cursor-not-allowed opacity-60"
					)}
				>
					<span
						className={cn(
							"inline-flex w-full h-8.5 min-w-0 text-left pl-2 pr-9 truncate overflow-hidden whitespace-normal line-clamp-1 border-input rounded-md border bg-transparent py-1 text-base shadow-xs",
							!selectedOption?.value && "text-muted-foreground"
						)}
					>
						{selectedOption?.[displayedProperty] || placeholder}
					</span>
					<span className="absolute end-0 inset-y-0 flex items-center justify-center px-2">
						<ChevronDown className="size-5 text-muted-foreground" />
					</span>
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{placeholder}</DrawerTitle>
					<DrawerDescription></DrawerDescription>
				</DrawerHeader>

				<div className="flex flex-col overflow-y-scroll">
					{options.map((option) => (
						<label
							id={option.label}
							key={option.label}
							className="py-2 px-4 flex items-center space-x-2"
						>
							<Checkbox
								id={option.label}
								checked={isSelected(option)}
								onCheckedChange={() => onChange(option)}
							/>
							<span className="text-sm leading-4">{option.label}</span>
						</label>
					))}
				</div>

				<DrawerFooter>
					<DrawerClose asChild>
						<Button block variant="outline">
							Выбрать
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default DrawerSelect;
