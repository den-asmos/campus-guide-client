import type { Role } from "../user/types";

export type SignInRequest = {
  login: string;
  password: string;
};

export type SignUpRequest = {
  login: string;
  email: string;
  password: string;
  role: Role.student | Role.lecturer;
  firstName: string;
  lastName: string;
  middleName: string;
};

export type AuthResponse = {
  message: string;
  token: string;
};
