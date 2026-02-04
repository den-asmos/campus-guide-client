import { fetcher } from "@/services/fetcher";
import type { UpdateAvatarResponse, UpdateUserRequest } from "../types";

export const updateUser = async (request: UpdateUserRequest) => {
	const response = await fetcher.put("/api/user/profile", request);
	return response.data;
};

export const requestPasswordReset = async (email: string) => {
	const response = await fetcher.post("/api/user/password-reset/request", {
		email,
	});
	return response.data;
};

export const verifyCode = async (request: { code: string; email: string }) => {
	const response = await fetcher.post(
		"/api/user/password-reset/verify",
		request,
	);
	return response.data;
};

export const resetPassword = async (request: {
	password: string;
	code: string;
	email: string;
}) => {
	const response = await fetcher.post(
		"/api/user/password-reset/reset",
		request,
	);
	return response.data;
};

export const updateAvatar = async (avatar: File) => {
	const formData = new FormData();
	formData.append("avatar", avatar);

	const response = await fetcher.post<UpdateAvatarResponse>(
		"/api/user/avatar",
		formData,
	);
	return response.data;
};

export const deleteAvatar = async () => {
	const response =
		await fetcher.delete<UpdateAvatarResponse>("/api/user/avatar");
	return response.data;
};
