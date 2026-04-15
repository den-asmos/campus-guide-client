import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { currentUser, signIn, signUp } from "../api/auth";

export const CURRENT_USER_KEY = "current-user";

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

export const useCurrentUser = () => {
  return useQuery({
    queryKey: [CURRENT_USER_KEY],
    queryFn: currentUser,
    retry: false,
  });
};
