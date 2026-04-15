import { fetcher } from "@/services/fetcher";
import type { Classroom } from "../types";

export const classroom = async (title: string | null) => {
  if (!title) {
    return Promise.reject(new Error("Invalid request params"));
  }
  const response = await fetcher.get<Classroom>("/api/classroom/title", {
    params: {
      title,
    },
  });
  return response.data;
};

export const floorClassrooms = async (floor: number) => {
  const response = await fetcher.get<Classroom[]>("/api/classroom/floor", {
    params: { floor },
  });
  return response.data;
};
