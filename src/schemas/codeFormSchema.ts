import z from "zod";

export const formSchema = z.object({
  code: z.string().trim().min(6).max(6),
});

export type CodeFormSchema = z.infer<typeof formSchema>;
