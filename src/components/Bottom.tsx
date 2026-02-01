import type { PropsWithChildren } from "react";

const Bottom = ({ children }: PropsWithChildren) => {
	return <div className="sticky bottom-4 z-20 space-y-2">{children}</div>;
};

export default Bottom;
