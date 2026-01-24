import { fetcher } from "@/services/fetcher";
import type { DirectionRequest, DirectionResponse } from "../types";

export const direction = async (params: DirectionRequest) => {
	const response = await fetcher.get<DirectionResponse>("/api/direction", {
		params,
	});
	return response.data;
};
