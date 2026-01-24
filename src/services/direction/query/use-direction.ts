import { useQuery } from "@tanstack/react-query";
import { direction } from "../api/direction";
import type { DirectionRequest } from "../types";

export const DIRECTION_KEY = "direction";

export const useDirection = (request: DirectionRequest) => {
	return useQuery({
		queryKey: [DIRECTION_KEY],
		queryFn: () => direction(request),
	});
};
