import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const userAvatarVariants = cva("flex justify-center items-center", {
	variants: {
		variant: {
			profile:
				"size-20 text-4xl shadow-md shadow-button-primary/30 border border-button-primary/10",
			header: "size-10 text-2xl",
		},
	},
	defaultVariants: {
		variant: "header",
	},
});

type Props = VariantProps<typeof userAvatarVariants> & {
	avatar?: string | null;
	firstName?: string;
	lastName?: string;
	onClick?: () => void;
};

const UserAvatar = ({
	avatar,
	firstName,
	lastName,
	variant,
	onClick,
}: Props) => {
	if (!firstName || !lastName) {
		return (
			<Avatar onClick={onClick} className={cn(userAvatarVariants({ variant }))}>
				<div className="bg-border animate-pulse"></div>
			</Avatar>
		);
	}

	if (avatar) {
		return (
			<Avatar onClick={onClick} className={cn(userAvatarVariants({ variant }))}>
				<img
					src={avatar}
					alt="avatar"
					className="w-full h-full object-cover scale-110"
				/>
			</Avatar>
		);
	}

	return (
		<Avatar onClick={onClick} className={cn(userAvatarVariants({ variant }))}>
			<p className="font-medium text-button-primary">
				{firstName[0].toUpperCase()}
			</p>
			<p className="font-medium text-button-primary">
				{lastName[0].toUpperCase()}
			</p>
		</Avatar>
	);
};

export default UserAvatar;
