import type { Course, Faculty, Group } from "../user/types";

export type TimetableRequest = {
	faculty: Faculty;
	course: Course;
	group: Group;
};

export type TimetableDay = {
	date: string;
	dayName: string;
	groups: TimetableGroup[];
};

export type TimetableGroup = {
	course: number;
	groupName: Group;
	specialty: string;
	subgroups: TimetableSubgroup[];
};

export type TimetableSubgroup = {
	subgroupName: string;
	lessons: TimetableLesson[];
};

export type TimetableLesson = {
	number: number;
	subject: string;
	time: string;
	type: LessonType;
	classroom: string | null;
	lecturer: string | null;
};

export enum LessonType {
	lecture = "лк",
	offline = "off",
	laboratory = "лз",
	practical = "пз",
	control = "куср",
	credit = "зач",
	other = "другое",
}

export const lessonTypeLabel: Record<LessonType, string> = {
	лк: "Лекция",
	off: "Оффлайн лекция",
	лз: "Лабораторное занятие",
	пз: "Практическое занятие",
	куср: "Контроль УСР",
	зач: "Зачёт",
	другое: "Другое",
};
