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
    <header className="bg-background sticky top-0 z-50 flex h-13 items-center px-4 shadow">
      <button onClick={onClickLeft} className="flex-1">
        {leftIcon || <ChevronLeft />}
      </button>
      <p className="line-clamp-1 flex-3 truncate px-4 text-center text-xl leading-none">
        {title}
      </p>
      <button onClick={onClickRight} className="flex flex-1 justify-end">
        {rightIcon}
      </button>
    </header>
  );
};

export default Header;
