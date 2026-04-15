import { fetcher } from "@/services/fetcher";
import type { TimetableDay, TimetableRequest } from "../types";

export const groupTimetable = async (params: TimetableRequest | null) => {
  if (!params) {
    return Promise.reject(new Error("Invalid request params"));
  }

  const response = await fetcher.get<TimetableDay[]>("/api/timetable/group", {
    params,
  });
  return response.data;
};

export const lecturerTimetable = async () => {
  const response = await fetcher.get<TimetableDay[]>("/api/timetable/lecturer");
  return response.data;
};

export const classroomTimetable = async (classroom: string) => {
  const response = await fetcher.get<TimetableDay[]>(
    "/api/timetable/classroom",
    { params: { classroom } },
  );
  return response.data;
};
