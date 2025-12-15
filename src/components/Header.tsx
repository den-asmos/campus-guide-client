import { ChevronLeft } from "lucide-react";
import type { ReactElement } from "react";

type Props = {
	title?: string;
	onClickLeft: () => void;
	onClickRight?: () => void;
	leftIcon?: ReactElement;
	rightIcon?: ReactElement;
};

const Header = ({
	title,
	onClickLeft,
	onClickRight,
	leftIcon,
	rightIcon,
}: Props) => {
	return (
		<header className="flex items-center px-4 h-13 sticky top-0 z-50 bg-background shadow">
			<button onClick={onClickLeft} className="flex-1">
				{leftIcon || <ChevronLeft />}
			</button>
			<p className="flex-3 px-4 text-xl truncate line-clamp-1 leading-none text-center">
				{title}
			</p>
			<button onClick={onClickRight} className="flex-1 flex justify-end">
				{rightIcon}
			</button>
		</header>
	);
};

export default Header;
