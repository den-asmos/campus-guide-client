import { useMutation, useQuery } from "@tanstack/react-query";
import { currentUser, updateUser } from "../api/user";

export const CURRENT_USER_KEY = "current-user";

export const useCurrentUser = () => {
	return useQuery({
		queryKey: [CURRENT_USER_KEY],
		queryFn: currentUser,
		retry: false,
	});
};

export const useUpdateUser = () => {
	return useMutation({
		mutationFn: updateUser,
	});
};
