import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../api/user";

export const useUpdateUser = () => {
	return useMutation({
		mutationFn: updateUser,
	});
};
