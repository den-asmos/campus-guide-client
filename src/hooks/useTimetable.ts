import {
  useGroupTimetable,
  useLecturerTimetable,
} from "@/services/timetable/query/use-timetable";
import { mapGroupTimetableRequestForUser } from "@/services/timetable/utils";
import { Role, type User } from "@/services/user/types";

export const useTimetable = (user: User | undefined) => {
  const groupTimetable = useGroupTimetable(
    mapGroupTimetableRequestForUser(user),
  );
  const lecturerTimetable = useLecturerTimetable(user?.role === Role.lecturer);

  return user?.role === Role.lecturer ? lecturerTimetable : groupTimetable;
};
