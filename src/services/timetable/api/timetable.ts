import { fetcher } from "@/services/fetcher";
import type {
  GroupTimetableRequest,
  LecturerTimetableRequest,
  TimetableDay,
} from "../types";

export const groupTimetable = async (params: GroupTimetableRequest | null) => {
  if (!params) {
    return Promise.reject(new Error("Invalid request params"));
  }

  const response = await fetcher.get<TimetableDay[]>("/api/timetable/group", {
    params,
  });
  return response.data;
};

export const lecturerTimetable = async (
  params: LecturerTimetableRequest | null,
) => {
  if (!params) {
    return Promise.reject(new Error("Invalid request params"));
  }

  const response = await fetcher.get<TimetableDay[]>(
    "/api/timetable/lecturer",
    { params },
  );
  return response.data;
};

export const classroomTimetable = async (classroom: string | null) => {
  if (!classroom) {
    return Promise.reject(new Error("Invalid request params"));
  }

  const response = await fetcher.get<TimetableDay[]>(
    "/api/timetable/classroom",
    { params: { classroom } },
  );
  return response.data;
};
