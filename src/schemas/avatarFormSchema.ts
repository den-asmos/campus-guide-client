import z from "zod";

export const formSchema = z.object({
	avatar: z
		.instanceof(File)
		.refine((file) => {
			return !file || ["image/png", "image/jpeg"].includes(file.type);
		}, "Поддерживаются только изображения .png и .jpeg форматов"),
});

export type AvatarFormSchema = z.infer<typeof formSchema>;
