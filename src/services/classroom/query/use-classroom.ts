import { useQuery } from "@tanstack/react-query";
import { classroom, floorClassrooms, searchClassroom } from "../api/classroom";

export const CLASSROOM_KEY = "classroom";
export const SEARCH_CLASSROOM_KEY = "search-classroom";
export const FLOOR_CLASSROOMS_KEY = "floor-classrooms";

export const useClassroom = (location: string | null) => {
  return useQuery({
    queryKey: [CLASSROOM_KEY, location],
    queryFn: () => classroom(location),
    enabled: !!location,
    retry: false,
  });
};

export const useFloorClassrooms = (floor: number) => {
  return useQuery({
    queryKey: [FLOOR_CLASSROOMS_KEY, floor],
    queryFn: () => floorClassrooms(floor),
    retry: false,
  });
};

export const useSearchClassroom = (query: string) => {
  return useQuery({
    queryKey: [SEARCH_CLASSROOM_KEY, query],
    queryFn: () => searchClassroom(query),
    enabled: query.length > 2,
    retry: 1,
  });
};
