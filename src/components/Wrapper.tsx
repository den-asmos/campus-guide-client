import type { ReactElement } from "react";

type Props = {
	children: ReactElement | ReactElement[];
};

const Wrapper = ({ children }: Props) => {
	return <div className="flex flex-col min-h-screen">{children}</div>;
};

export default Wrapper;
