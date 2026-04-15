import { Course, Faculty, Gender, Group } from "@/services/user/types";
import dayjs from "dayjs";
import z from "zod";

export const formSchema = z.object({
  birthDate: z
    .string()
    .catch("")
    .optional()
    .refine((date) => {
      if (!date) {
        return true;
      }
      const birthDate = dayjs(date, "DD.MM.YYYY");
      return dayjs().diff(birthDate, "year") >= 16;
    }),
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
  gender: z
    .object({
      value: z.enum(Gender),
      label: z.string(),
    })
    .optional(),
});

export type ProfileFormSchema = z.infer<typeof formSchema>;
