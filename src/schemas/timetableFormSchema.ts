import { Course, Faculty, Group } from "@/services/user/types";
import z from "zod";

export const formSchema = z.object({
	faculty: z.object({
		value: z.enum(Faculty),
		label: z.string(),
	}),
	course: z.object({
		value: z.enum(Course),
		label: z.string(),
	}),
	group: z.object({
		value: z.enum(Group),
		label: z.string(),
	}),
});

export type TimetableFormSchema = z.infer<typeof formSchema>;
