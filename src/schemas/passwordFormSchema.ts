import z from "zod";

export const formSchema = z
	.object({
		password: z.string().min(6).max(20).trim(),
		passwordConfirmation: z.string().min(6).max(20).trim(),
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

export type PasswordFormSchema = z.infer<typeof formSchema>;
