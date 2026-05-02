import { useQuery } from "@tanstack/react-query";
import {
  classroomTimetable,
  groupTimetable,
  lecturerTimetable,
} from "../api/timetable";
import type { GroupTimetableRequest, LecturerTimetableRequest } from "../types";

export const GROUP_TIMETABLE_KEY = "group-timetable";
export const LECTURER_TIMETABLE_KEY = "lecturer-timetable";
export const CLASSROOM_TIMETABLE_KEY = "classroom-timetable";

export const useGroupTimetable = (
  request: GroupTimetableRequest | null,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: [GROUP_TIMETABLE_KEY, request],
    queryFn: () => groupTimetable(request),
    enabled: !!request && enabled,
    retry: false,
  });
};

export const useLecturerTimetable = (
  request: LecturerTimetableRequest | null,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: [LECTURER_TIMETABLE_KEY],
    queryFn: () => lecturerTimetable(request),
    retry: false,
    enabled: !!request && enabled,
  });
};

export const useClassroomTimetable = (
  classroom: string | null,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: [CLASSROOM_TIMETABLE_KEY, classroom],
    queryFn: () => classroomTimetable(classroom),
    retry: false,
    enabled: !!classroom && enabled,
  });
};
