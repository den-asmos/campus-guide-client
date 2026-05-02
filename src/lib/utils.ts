import type { Classroom } from "@/services/classroom/types";
import {
  NodeType,
  type DirectionNode,
  type FloorGroup,
} from "@/services/direction/types";
import type { RequestError } from "@/services/fetcher";
import {
  Course,
  Faculty,
  groupsByFacultiesAndCourses,
  Role,
  type JwtPayload,
  type User,
} from "@/services/user/types";
import type { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { courseOptions, groupOptions } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const findByValue = <
  T extends { label: string; value: string | number },
>(
  value: string | number,
  options: T[],
) => {
  return options.find((option) => option.value === value)?.label;
};

export const decodeJwt = (token: string) => {
  const part = token.split(".")[1];
  if (typeof part !== "string") {
    throw new Error("Invalid token");
  }

  const base64 = part.replace(/-/g, "+").replace(/_/g, "/");

  const payload = decodeURIComponent(
    atob(base64).replace(/(.)/g, (_, char) => {
      return (
        "%" +
        (char as string)
          .charCodeAt(0)
          .toString(16)
          .toUpperCase()
          .padStart(2, "0")
      );
    }),
  );

  return JSON.parse(payload) as JwtPayload;
};

export const getErrorMessage = (error: AxiosError) => {
  const responseData = error.response?.data;

  if (!responseData) {
    return undefined;
  }

  return (responseData as RequestError).error.message;
};

export const filterCourseOptions = (faculty: Faculty | undefined) => {
  if (faculty === Faculty.ХГФ || faculty === Faculty.ФГЗиК) {
    return courseOptions;
  }
  return courseOptions.filter((option) => option.value !== 5);
};

export const filterGroupOptions = (
  faculty: Faculty | undefined,
  course: Course | undefined,
) => {
  if (!faculty || !course) {
    return groupOptions;
  }
  return groupOptions.filter((group) =>
    groupsByFacultiesAndCourses[faculty][course].includes(group.value),
  );
};

export const compareObjects = <T extends Record<string | number, unknown>>(
  first: T,
  second: T,
) => {
  return Object.entries(first).every(([key, value]) => second[key] === value);
};

export const getUserLabel = (user: User | undefined): string => {
  if (!user) {
    return "";
  }

  switch (user.role) {
    case Role.admin:
      return user.login;
    case Role.lecturer:
      return `${user.firstName} ${user.middleName}`.trim();
    case Role.student:
      return user.firstName;
    default:
      return "";
  }
};

export const findClassroom = (
  locationId: string | undefined,
  classrooms: Classroom[] | undefined,
) => {
  if (!locationId || !classrooms) {
    return;
  }

  const classroomId = locationId.split("location-id-")[1];
  return classrooms.find((classroom) => classroom.id === classroomId);
};

export const getLocationLabel = (location: DirectionNode) => {
  return location.type === NodeType.classroom
    ? location.title
    : location.description;
};

export const getDirectionLabel = (
  origin: DirectionNode,
  destination: DirectionNode,
  group: FloorGroup,
): string => {
  if (
    origin.type === destination.type &&
    (origin.type === NodeType.elevator || origin.type === NodeType.stairs)
  ) {
    return `${group.fromFloor} этаж \u2192 ${group.toFloor} этаж`;
  }

  return `${getLocationLabel(origin)} \u2192 ${getLocationLabel(destination)}`;
};
