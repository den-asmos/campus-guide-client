import { useQuery } from "@tanstack/react-query";
import { classroom, floorClassrooms } from "../api/classroom";

export const CLASSROOM_KEY = "classroom";
export const FLOOR_CLASSROOMS_KEY = "floor-classrooms";

export const useClassroom = (location: string | null) => {
	return useQuery({
		queryKey: [CLASSROOM_KEY, location],
		queryFn: () => classroom(location),
		enabled: !!location,
	});
};

export const useFloorClassrooms = (floor: number) => {
	return useQuery({
		queryKey: [FLOOR_CLASSROOMS_KEY, floor],
		queryFn: () => floorClassrooms(floor),
	});
};
