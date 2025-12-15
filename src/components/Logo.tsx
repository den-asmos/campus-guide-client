import { GraduationCap } from "lucide-react";

const Logo = () => {
	return (
		<div className="flex flex-col justify-center items-center mx-auto">
			<GraduationCap className="stroke-button-primary size-18" />
			<p className="text-button-primary text-xl font-bold leading-none">Campus Gide</p>
		</div>
	);
};

export default Logo;
