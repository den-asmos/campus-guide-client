import { z } from "zod";

export const formSchema = z.object({
  query: z.string().min(3).max(100).trim(),
});

export type SearchFormSchema = z.infer<typeof formSchema>;
