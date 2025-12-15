import { fetcher } from "@/services/fetcher";
import type { UpdateUserRequest, User } from "../types";

export const currentUser = async () => {
	const response = await fetcher.get<User>("/api/auth/current");
	return response.data;
};

export const updateUser = async (request: UpdateUserRequest) => {
	const response = await fetcher.put("/api/auth/profile", request);
	return response.data;
};
