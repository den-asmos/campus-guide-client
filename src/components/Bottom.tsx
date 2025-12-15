import type { ReactElement } from "react";

type Props = {
	children: ReactElement | ReactElement[];
};

const Bottom = ({ children }: Props) => {
	return <div className="sticky bottom-4 z-20">{children}</div>;
};

export default Bottom;
