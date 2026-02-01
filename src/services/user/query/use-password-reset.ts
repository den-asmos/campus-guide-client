import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset, resetPassword, verifyCode } from "../api/user";

export const useRequestPasswordReset = () => {
	return useMutation({
		mutationFn: requestPasswordReset,
	});
};

export const useVerifyCode = () => {
	return useMutation({
		mutationFn: verifyCode,
	});
};

export const useResetPassword = () => {
	return useMutation({
		mutationFn: resetPassword,
	});
};
