import type { TimetableFilterFormSchema } from "@/schemas/timetableFilterFormSchema";
import {
  useClassroomTimetable,
  useGroupTimetable,
  useLecturerTimetable,
} from "@/services/timetable/query/use-timetable";
import { TimetableMode } from "@/services/timetable/types";
import {
  mapGroupTimetableRequest,
  mapGroupTimetableRequestForUser,
  mapLecturerTimetableRequest,
} from "@/services/timetable/utils";
import { Role, type User } from "@/services/user/types";

export const useHomePageTimetable = (user: User | undefined) => {
  const groupTimetable = useGroupTimetable(
    mapGroupTimetableRequestForUser(user),
  );

  const lecturerRequest = user
    ? {
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
      }
    : null;
  const lecturerTimetable = useLecturerTimetable(
    lecturerRequest,
    user?.role === Role.lecturer,
  );

  return user?.role === Role.lecturer ? lecturerTimetable : groupTimetable;
};

export const useTimetable = (filters: TimetableFilterFormSchema | null) => {
  const group = useGroupTimetable(
    mapGroupTimetableRequest(filters?.group ?? null),
    filters?.mode.value === TimetableMode.group,
  );
  const lecturer = useLecturerTimetable(
    mapLecturerTimetableRequest(filters?.lecturer ?? null),
    filters?.mode.value === TimetableMode.lecturer,
  );
  const classroom = useClassroomTimetable(
    filters?.classroom?.classroom ?? null,
    filters?.mode.value === TimetableMode.classroom,
  );

  if (filters === null) {
    return {
      data: null,
      isError: true,
      isLoading: false,
      isFetched: true,
      error: "Invalid timetable filters",
    };
  }

  const map = { group, lecturer, classroom };
  return map[filters.mode.value];
};
