import type { TimetableFormSchema } from "@/schemas/timetableFormSchema";
import type { User } from "../user/types";
import type { TimetableRequest } from "./types";

export const mapTimetableRequest = (
	values: Partial<TimetableFormSchema>
): TimetableRequest | null => {
	if (!values.faculty || !values.course || !values.group) {
		return null;
	}

	return {
		faculty: values.faculty.value,
		course: values.course.value,
		group: values.group.value,
	};
};

export const mapGroupTimetableRequestForUser = (
	user: User | undefined
): TimetableRequest | null => {
	if (!user?.faculty || !user.course || !user.group) {
		return null;
	}

	return {
		faculty: user.faculty,
		course: user.course,
		group: user.group,
	};
};
