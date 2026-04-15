import { GraduationCap } from "lucide-react";

const Logo = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <GraduationCap className="stroke-button-primary size-18" />
      <p className="text-button-primary text-xl leading-none font-bold">
        Campus Gide
      </p>
    </div>
  );
};

export default Logo;
