import type { Course, Faculty, Group, User } from "../user/types";

export type GroupTimetableRequest = {
  faculty: Faculty;
  course: Course;
  group: Group;
};

export type LecturerTimetableRequest = {
  firstName: User["firstName"];
  lastName: User["lastName"];
  middleName: User["middleName"];
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
  exam = "экз",
  consultation = "конс",
  other = "другое",
}

export const lessonTypeLabel: Record<LessonType, string> = {
  лк: "Лекция",
  off: "Оффлайн лекция",
  лз: "Лабораторное занятие",
  пз: "Практическое занятие",
  куср: "Контроль УСР",
  зач: "Зачёт",
  экз: "Экзамен",
  конс: "Консультация",
  другое: "Другое",
};

export enum TimetableMode {
  group = "group",
  lecturer = "lecturer",
  classroom = "classroom",
}

export const timetableModeLabel: Record<TimetableMode, string> = {
  group: "Расписание для группы",
  lecturer: "Расписание для преподавателя",
  classroom: "Расписание для аудитории",
};
