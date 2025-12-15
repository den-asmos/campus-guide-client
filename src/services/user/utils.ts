import { dateParams } from "@/lib/maskito/date";
import { toDate } from "@/lib/time";
import type { ProfileFormSchema } from "@/schemas/profileFormSchema";
import { maskitoStringifyDate } from "@maskito/kit";
import type { UpdateUserRequest, User } from "./types";

export const mapUpdateUserRequest = (
	values: ProfileFormSchema
): UpdateUserRequest => {
	return {
		birthDate: values.birthDate ? toDate(values.birthDate) : null,
		faculty: values.faculty?.value || null,
		course: values.course?.value || null,
		group: values.group?.value || null,
		gender: values.gender?.value || null,
	};
};

export const hasUserChanged = (
	user: User | undefined,
	values: ProfileFormSchema
) => {
	if (!user) {
		return false;
	}

	if (
		!!values.birthDate &&
		(user.birthDate === null ||
			values.birthDate !==
				maskitoStringifyDate(toDate(user.birthDate, "YYYY.MM.DD"), dateParams))
	) {
		return true;
	}
	if (
		!!values.course &&
		(user.course === null || values.course.value !== user.course)
	) {
		return true;
	}
	if (
		!!values.faculty &&
		(user.faculty === null || values.faculty.value !== user.faculty)
	) {
		return true;
	}
	if (
		!!values.gender &&
		(user.gender === null || values.gender.value !== user.gender)
	) {
		return true;
	}
	if (
		!!values.group &&
		(user.group === null || values.group.value !== user.group)
	) {
		return true;
	}

	return false;
};
