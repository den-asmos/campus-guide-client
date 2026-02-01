import { fetcher } from "@/services/fetcher";
import type { User } from "@/services/user/types";
import type { AuthResponse, SignInRequest, SignUpRequest } from "../types";

export const signIn = async (request: SignInRequest) => {
	const response = await fetcher.post<AuthResponse>(
		"/api/auth/sign-in",
		request,
	);
	return response.data;
};

export const signUp = async (request: SignUpRequest) => {
	const response = await fetcher.post<AuthResponse>(
		"/api/auth/sign-up",
		request,
	);
	return response.data;
};

export const currentUser = async () => {
	const response = await fetcher.get<User>("/api/auth/current");
	return response.data;
};
