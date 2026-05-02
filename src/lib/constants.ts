import { TimetableMode, timetableModeLabel } from "@/services/timetable/types";
import {
  courseLabel,
  facultyLabel,
  genderLabel,
  Group,
  roleLabel,
} from "@/services/user/types";

export const roleOptions = Object.entries(roleLabel).map(([value, label]) => ({
  value,
  label,
}));

export const genderOptions = Object.entries(genderLabel).map(
  ([value, label]) => ({
    value,
    label,
  }),
);

export const facultyOptions = Object.entries(facultyLabel).map(
  ([value, label]) => ({
    value,
    label,
  }),
);

export const courseOptions = Object.entries(courseLabel).map(
  ([value, label]) => ({
    value: Number(value),
    label,
  }),
);

export const groupOptions = Object.values(Group).map((group) => ({
  value: group,
  label: group,
}));

export const timetableModeOptions = Object.values(TimetableMode).map(
  (mode) => ({
    value: mode,
    label: timetableModeLabel[mode],
  }),
);

export const PASSWORD_RESET = {
  RESEND_COOLDOWN: 60,
  STEP_KEY: "passwordResetStep",
  CODE_KEY: "passwordResetCode",
  EMAIL_KEY: "passwordResetEmail",
  EXPIRY_KEY: "passwordResetExpiry",
  COUNTDOWN_KEY: "passwordResetCountdown",
};

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const TIMETABLE_FILTER = "timetableFilter";
