import type {
  GroupFormSchema,
  LecturerFormSchema,
} from "@/schemas/timetableFilterFormSchema";
import type { User } from "../user/types";
import type { GroupTimetableRequest, LecturerTimetableRequest } from "./types";

export const mapGroupTimetableRequest = (
  values: Partial<GroupFormSchema> | null,
): GroupTimetableRequest | null => {
  if (!values?.faculty || !values.course || !values.group) {
    return null;
  }

  return {
    faculty: values.faculty.value,
    course: values.course.value,
    group: values.group.value,
  };
};

export const mapLecturerTimetableRequest = (
  values: Partial<LecturerFormSchema> | null,
): LecturerTimetableRequest | null => {
  if (!values?.firstName || !values.lastName || !values.middleName) {
    return null;
  }

  return {
    firstName: values.firstName,
    lastName: values.lastName,
    middleName: values.middleName,
  };
};

export const mapGroupTimetableRequestForUser = (
  user: User | undefined,
): GroupTimetableRequest | null => {
  if (!user?.faculty || !user.course || !user.group) {
    return null;
  }

  return {
    faculty: user.faculty,
    course: user.course,
    group: user.group,
  };
};
