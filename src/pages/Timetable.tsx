import TimetableLessonCard from "@/components/cards/TimetableLessonCard";
import Header from "@/components/Header";
import Hint from "@/components/Hint";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Wrapper from "@/components/Wrapper";
import { usePersistedState } from "@/hooks/usePersistedState";
import { useTimetable } from "@/hooks/useTimetable";
import { TIMETABLE_FILTER } from "@/lib/constants";
import { mapTimetableDay } from "@/lib/mappers";
import { currentWeekDates } from "@/lib/time";
import type { TimetableFilterFormSchema } from "@/schemas/timetableFilterFormSchema";
import {
  formSchema,
  type TimetableFormSchema,
} from "@/schemas/timetableFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Timetable = () => {
  const navigate = useNavigate();
  const form = useForm<TimetableFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      useNextWeek: false,
    },
  });
  const { useNextWeek } = form.watch();
  const currentWeek = useMemo(
    () => currentWeekDates(useNextWeek),
    [useNextWeek],
  );
  const [selectedDay, setSelectedDay] = useState(currentWeek.currentDate);
  const [filters] = usePersistedState<TimetableFilterFormSchema | null>(
    TIMETABLE_FILTER,
    null,
  );

  const {
    data: timetable,
    isLoading,
    isFetched,
    isError,
    error,
  } = useTimetable(filters);

  useEffect(() => {
    if (isError) {
      console.error(error);
      toast.error("Ошибка получения расписания");
    }
  }, [isError, error]);

  useEffect(() => {
    setSelectedDay(currentWeek.currentDate);
  }, [currentWeek]);

  const timetableDay = useMemo(() => {
    if (!timetable) {
      return [];
    }

    return mapTimetableDay(selectedDay, timetable);
  }, [selectedDay, timetable]);

  if (isLoading) {
    <Wrapper>
      <Header title="Расписание" onClickLeft={() => navigate(-1)} />
      <Layout>
        <div className="flex grow items-center justify-center">
          <Loader color="primary" />
        </div>
      </Layout>
    </Wrapper>;
  }

  if (filters === null) {
    return <Navigate to="/timetable/filter" replace />;
  }

  return (
    <Wrapper>
      <Header title="Расписание" onClickLeft={() => navigate(-1)} />
      <Layout>
        <div className="flex grow flex-col space-y-6">
          <form className="flex flex-col space-y-4">
            <Controller
              name="useNextWeek"
              control={form.control}
              render={({ field }) => (
                <Field className="flex-row gap-2">
                  <Switch
                    id="useNextWeek"
                    checked={form.getValues("useNextWeek")}
                    onCheckedChange={(value) => field.onChange(value)}
                  />
                  <FieldLabel htmlFor="useNextWeek">
                    Показать следующую неделю
                  </FieldLabel>
                </Field>
              )}
            />
            <Tabs value={selectedDay} onValueChange={setSelectedDay}>
              <TabsList>
                {currentWeek.dates.map((date) => (
                  <TabsTrigger
                    key={date.value}
                    value={date.value}
                    className="capitalize"
                  >
                    {date.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </form>

          <div className="flex grow flex-col space-y-4 overflow-y-scroll">
            {timetableDay.length > 0 &&
              timetableDay.map((lesson, index) => (
                <TimetableLessonCard key={index} lesson={lesson} variant="sm" />
              ))}

            {timetableDay.length === 0 && isFetched && (
              <Hint className="text-center">В этот день занятий нет</Hint>
            )}
          </div>
        </div>
      </Layout>
      <Navbar />
    </Wrapper>
  );
};

export default Timetable;
