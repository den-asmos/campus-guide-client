import z from "zod";

export const formSchema = z.object({
  useNextWeek: z.boolean().optional(),
});

export type TimetableFormSchema = z.infer<typeof formSchema>;
