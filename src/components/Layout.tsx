import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

const Layout = ({ children, className }: Props) => {
  return (
    <main
      className={cn("bg-background flex w-full flex-1 flex-col p-4", className)}
    >
      {children}
    </main>
  );
};

export default Layout;
