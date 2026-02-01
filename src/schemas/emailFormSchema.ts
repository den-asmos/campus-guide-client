import z from "zod";

export const formSchema = z.object({
	email: z.email().trim(),
});

export type EmailFormSchema = z.infer<typeof formSchema>;
