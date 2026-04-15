import { fetcher } from "@/services/fetcher";
import type { DirectionRequest, DirectionResponse } from "../types";

export const direction = async (params: DirectionRequest | null) => {
  if (!params) {
    return Promise.reject(new Error("Invalid request params"));
  }
  const response = await fetcher.get<DirectionResponse>("/api/direction", {
    params,
  });
  return response.data;
};
