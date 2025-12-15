import { Role } from "@/services/user/types";
import z from "zod";

export const formSchema = z
	.object({
		login: z.string().min(2).max(100).trim(),
		email: z.email().trim(),
		password: z.string().min(6).max(20).trim(),
		passwordConfirmation: z.string().min(6).max(20).trim(),
		role: z.object({
			value: z.enum([Role.student, Role.lecturer]),
			label: z.string(),
		}),
		firstName: z.string().min(2).max(100).trim(),
		lastName: z.string().min(2).max(100).trim(),
		middleName: z.string().min(2).max(100).trim(),
	})
	.superRefine((data, context) => {
		if (data.password !== data.passwordConfirmation) {
			context.addIssue({
				code: "custom",
				message: "Пароли должны совпадать",
				path: ["passwordConfirmation"],
			});
		}
	});

export type SignUpFormSchema = z.infer<typeof formSchema>;
