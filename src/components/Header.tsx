import type { ReactElement } from "react";

type Props = {
  title?: string;
  onClickLeft?: () => void;
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
    <header className="bg-background sticky top-0 z-50 flex h-15 items-center px-6 shadow">
      <button onClick={onClickLeft} className="flex-1">
        {leftIcon}
      </button>
      <p className="line-clamp-1 flex-3 truncate px-6 text-center text-xl leading-none">
        {title}
      </p>
      <button onClick={onClickRight} className="flex flex-1 justify-end">
        {rightIcon}
      </button>
    </header>
  );
};

export default Header;
