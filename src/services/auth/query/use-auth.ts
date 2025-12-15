import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { signIn, signUp } from "../api/auth";

export const useSignIn = () => {
	const { saveToken } = useAuth();

	return useMutation({
		mutationFn: signIn,
		onSuccess: (data) => {
			saveToken(data.token);
		},
	});
};

export const useSignUp = () => {
	const { saveToken } = useAuth();

	return useMutation({
		mutationFn: signUp,
		onSuccess: (data) => {
			saveToken(data.token);
		},
	});
};

export const useSignOut = () => {
	const { clearToken } = useAuth();

	return useMutation({
		mutationFn: async () => {
			clearToken();
			window.location.href = "/sign-in";
		},
	});
};
