import type { PropsWithChildren } from "react";

const Wrapper = ({ children }: PropsWithChildren) => {
	return <div className="flex flex-col min-h-screen">{children}</div>;
};

export default Wrapper;
