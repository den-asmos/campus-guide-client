import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

const Bottom = ({ children, className }: Props) => {
  return (
    <div className={cn("sticky bottom-4 z-20 space-y-2", className)}>
      {children}
    </div>
  );
};

export default Bottom;
