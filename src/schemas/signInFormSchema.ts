import { z } from "zod";

export const formSchema = z.object({
	login: z.string().min(2).max(100).trim(),
	password: z.string().min(6).max(20).trim(),
});

export type SignInFormSchema = z.infer<typeof formSchema>;
