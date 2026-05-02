import dayjs from "dayjs";
import ru from "dayjs/locale/ru";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.locale(ru);

export const toDate = (date: string, format?: dayjs.OptionType) => {
  return dayjs(date, format || "DD.MM.YYYY").toDate();
};

export const currentWeek = () => {
  let monday = dayjs().startOf("week");
  let sunday = dayjs().endOf("week").subtract(1, "day");

  if (dayjs().get("day") === 0) {
    monday = dayjs().add(1, "week").startOf("week");
    sunday = dayjs().add(1, "week").endOf("week").subtract(1, "day");
  }

  return `${monday.format("DD.MM.YYYY")} — ${sunday.format("DD.MM.YYYY")}`;
};

export const currentWeekDates = (useNextWeek = false) => {
  let monday = dayjs().startOf("week");
  if (dayjs().get("day") === 0) {
    monday = dayjs().add(1, "week").startOf("week");
  }

  if (useNextWeek) {
    monday = monday.add(1, "week");
  }

  const today = dayjs().get("day") === 0 ? dayjs().add(1, "day") : dayjs();
  const currentDate = useNextWeek
    ? monday.format("DD.MM.YYYY")
    : today.format("DD.MM.YYYY");

  return {
    dates: [0, 1, 2, 3, 4, 5].map((index) => ({
      value: monday.add(index, "day").format("DD.MM.YYYY"),
      label: monday.add(index, "day").format("dd"),
    })),
    currentDate,
  };
};

export const currentDate = () => {
  return dayjs().format("DD.MM.YYYY");
};

export const isLessonInFuture = (time: string) => {
  const currentDate = dayjs().format("YYYY-MM-DD");
  const lessonEnd = dayjs(`${currentDate}T${time.split("-")[1]}`);

  return dayjs().isBefore(lessonEnd);
};

export const dayTimeGreeting = () => {
  const hour = dayjs().get("hour");

  if (hour >= 6 && hour < 12) {
    return "Доброе утро";
  } else if (hour >= 12 && hour < 18) {
    return "Добрый день";
  } else if (hour >= 18 && hour < 21) {
    return "Добрый вечер";
  } else {
    return "Доброй ночи";
  }
};

export const formatCountdownTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
