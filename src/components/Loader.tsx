import { cn } from "@/lib/utils";

type Props = {
  color?: "default" | "primary";
};

const Loader = ({ color = "default" }: Props) => {
  return (
    <div
      className={cn(
        "animate-loading relative -left-1/3 mx-auto my-4 box-border block h-2.5 w-2.5 rounded-full bg-transparent",
        color === "default" ? "text-white" : "text-button-primary",
      )}
    ></div>
  );
};

export default Loader;
