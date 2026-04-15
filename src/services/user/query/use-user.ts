import { useMutation } from "@tanstack/react-query";
import { deleteAvatar, updateAvatar, updateUser } from "../api/user";

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUser,
  });
};

export const useUpdateAvatar = () => {
  return useMutation({
    mutationFn: updateAvatar,
  });
};

export const useDeleteAvatar = () => {
  return useMutation({
    mutationFn: deleteAvatar,
  });
};
