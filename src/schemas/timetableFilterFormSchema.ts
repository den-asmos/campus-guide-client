import { TimetableMode } from "@/services/timetable/types";
import { Course, Faculty, Group } from "@/services/user/types";
import z from "zod";

const groupSchema = z.object({
  faculty: z
    .object({
      value: z.enum(Faculty),
      label: z.string(),
    })
    .optional(),
  course: z
    .object({
      value: z.enum(Course),
      label: z.string(),
    })
    .optional(),
  group: z
    .object({
      value: z.enum(Group),
      label: z.string(),
    })
    .optional(),
});

const lecturerSchema = z.object({
  firstName: z.string().max(100).trim(),
  lastName: z.string().max(100).trim(),
  middleName: z.string().max(100).trim(),
});

const classroomSchema = z.object({
  classroom: z.string().max(100).trim(),
});

export const formSchema = z
  .object({
    mode: z.object({
      value: z.enum(TimetableMode),
      label: z.string(),
    }),
    group: groupSchema.optional(),
    lecturer: lecturerSchema.optional(),
    classroom: classroomSchema.optional(),
  })
  .superRefine((data, context) => {
    const mode = data.mode.value;

    if (mode === TimetableMode.group) {
      if (!data.group?.faculty) {
        context.addIssue({
          code: "custom",
          message: "Выберите факультет",
          path: ["group", "faculty"],
        });
      }
      if (!data.group?.course) {
        context.addIssue({
          code: "custom",
          message: "Выберите курс",
          path: ["group", "course"],
        });
      }
      if (!data.group?.group) {
        context.addIssue({
          code: "custom",
          message: "Выберите группу",
          path: ["group", "group"],
        });
      }
    }

    if (mode === TimetableMode.lecturer) {
      if (!data.lecturer?.firstName || data.lecturer.firstName.length < 2) {
        context.addIssue({
          code: "custom",
          message: "Введите имя преподавателя",
          path: ["lecturer", "firstName"],
        });
      }
      if (!data.lecturer?.lastName || data.lecturer.lastName.length < 2) {
        context.addIssue({
          code: "custom",
          message: "Введите фамилия преподавателя",
          path: ["lecturer", "lastName"],
        });
      }
      if (!data.lecturer?.middleName || data.lecturer.middleName.length < 2) {
        context.addIssue({
          code: "custom",
          message: "Введите отчество преподавателя",
          path: ["lecturer", "middleName"],
        });
      }
    }

    if (mode === TimetableMode.classroom) {
      if (!data.classroom?.classroom || data.classroom.classroom.length < 3) {
        context.addIssue({
          code: "custom",
          message: "Введите аудиторию",
          path: ["classroom", "classroom"],
        });
      }
    }
  });

export type GroupFormSchema = z.infer<typeof groupSchema>;
export type LecturerFormSchema = z.infer<typeof lecturerSchema>;
export type TimetableFilterFormSchema = z.infer<typeof formSchema>;
