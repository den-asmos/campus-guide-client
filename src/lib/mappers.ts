import type { TimetableDay, TimetableLesson } from "@/services/timetable/types";
import { compareObjects } from "./utils";

type LessonWithSubgroup = TimetableLesson & { subgroupName: string };

export const mapTimetableDay = (
  selectedDay: string | undefined,
  timetable: TimetableDay[],
) => {
  const day = timetable.find((day) => day.date === selectedDay);
  if (!day?.groups.length) {
    return [];
  }

  const lessonsMap = new Map<number, LessonWithSubgroup[]>();
  const subgroups = day.groups.flatMap((g) => g.subgroups);

  for (const subgroup of subgroups) {
    for (const lesson of subgroup.lessons) {
      const lessonWithSubgroup = {
        ...lesson,
        subgroupName: subgroup.subgroupName,
      };

      const bucket = lessonsMap.get(lesson.number);
      if (!bucket) {
        lessonsMap.set(lesson.number, [lessonWithSubgroup]);
        continue;
      }

      const allSame = bucket.every(({ subgroupName: _, ...item }) =>
        compareObjects(item, lesson),
      );

      if (allSame) {
        for (const item of bucket) {
          item.subgroupName += `, ${subgroup.subgroupName}`;
        }
      } else {
        bucket.push(lessonWithSubgroup);
      }
    }
  }

  return Array.from(lessonsMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([, lessons]) => lessons);
};
