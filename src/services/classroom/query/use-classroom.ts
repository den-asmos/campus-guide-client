import { useQuery } from "@tanstack/react-query";
import { classroom } from "../api/classroom";

export const CLASSROOM_KEY = "classroom";

export const useClassroom = (title: string | undefined) => {
	return useQuery({
		queryKey: [CLASSROOM_KEY, title],
		queryFn: () => classroom(title),
		enabled: !!title,
	});
};
