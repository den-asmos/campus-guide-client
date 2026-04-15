import { dayTimeGreeting } from "@/lib/time";
import { getUserLabel } from "@/lib/utils";
import { type User } from "@/services/user/types";
import { useMemo } from "react";

export const useGreeting = (user: User | undefined) => {
  const userLabel = useMemo(() => getUserLabel(user), [user]);

  return {
    userLabel,
    dayTimeGreeting: dayTimeGreeting(),
  };
};
