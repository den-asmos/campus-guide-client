import type { TimetableDay, TimetableLesson } from "@/services/timetable/types";
import { compareObjects } from "./utils";

export const mapTimetableDay = (
	selectedDay: string | undefined,
	timetable: TimetableDay[]
) => {
	const timetableForSelectedDay = timetable.find(
		(day) => day.date === selectedDay
	);

	if (!timetableForSelectedDay?.groups) {
		return [];
	}

	const result: Array<Array<TimetableLesson & { subgroupName: string }>> = [];

	const allLessons = timetableForSelectedDay.groups.flatMap((group) =>
		group.subgroups.flatMap((subgroup) =>
			subgroup.lessons.map((lesson) => ({
				...lesson,
				subgroupName: subgroup.subgroupName,
			}))
		)
	);

	allLessons.forEach((lesson) => {
		const existingLessonIndex = result.findIndex((item) =>
			item.some((element) => element.number === lesson.number)
		);

		if (existingLessonIndex === -1) {
			result.push([lesson]);
		} else if (
			!result[existingLessonIndex].every((item) => compareObjects(item, lesson))
		) {
			result[existingLessonIndex].push(lesson);
		} else {
			result[existingLessonIndex] = result[existingLessonIndex].map((item) => ({
				...item,
				subgroupName: item.subgroupName + `, ${lesson.subgroupName}`,
			}));
		}
	});

	result.sort((a, b) => a[0].number - b[0].number);

	return result;
};
