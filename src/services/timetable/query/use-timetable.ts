import { useQuery } from "@tanstack/react-query";
import {
	classroomTimetable,
	groupTimetable,
	lecturerTimetable,
} from "../api/timetable";
import type { TimetableRequest } from "../types";

export const GROUP_TIMETABLE_KEY = "group-timetable";
export const LECTURER_TIMETABLE_KEY = "lecturer-timetable";
export const CLASSROOM_TIMETABLE_KEY = "classroom-timetable";

export const useGroupTimetable = (request: TimetableRequest | null) => {
	return useQuery({
		queryKey: [GROUP_TIMETABLE_KEY, request],
		queryFn: () => groupTimetable(request),
		enabled: !!request,
		retry: false,
	});
};

export const useLecturerTimetable = (enabled = true) => {
	return useQuery({
		queryKey: [LECTURER_TIMETABLE_KEY],
		queryFn: () => lecturerTimetable(),
		retry: false,
		enabled,
	});
};

export const useClassroomTimetable = (classroom: string) => {
	return useQuery({
		queryKey: [CLASSROOM_TIMETABLE_KEY, classroom],
		queryFn: () => classroomTimetable(classroom),
		retry: false,
	});
};
