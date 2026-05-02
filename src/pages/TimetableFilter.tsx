import Bottom from "@/components/Bottom";
import ClassroomFilter from "@/components/filters/ClassroomFilter";
import GroupFilter from "@/components/filters/GroupFilter";
import LecturerFilter from "@/components/filters/LecturerFilter";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import DrawerSelect from "@/components/ui/drawer-select";
import { Field } from "@/components/ui/field";
import Wrapper from "@/components/Wrapper";
import { usePersistedState } from "@/hooks/usePersistedState";
import {
  courseOptions,
  facultyOptions,
  groupOptions,
  TIMETABLE_FILTER,
  timetableModeOptions,
} from "@/lib/constants";
import { findByValue } from "@/lib/utils";
import {
  formSchema,
  type TimetableFilterFormSchema,
} from "@/schemas/timetableFilterFormSchema";
import { useCurrentUser } from "@/services/auth/query/use-auth";
import { TimetableMode, timetableModeLabel } from "@/services/timetable/types";
import { Role } from "@/services/user/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const defaultValues = {
  mode: {
    value: TimetableMode.group,
    label: timetableModeLabel[TimetableMode.group],
  },
  group: {
    faculty: undefined,
    course: undefined,
    group: undefined,
  },
  lecturer: {
    firstName: "",
    lastName: "",
    middleName: "",
  },
  classroom: {
    classroom: "",
  },
};

const TimetableFilter = () => {
  const navigate = useNavigate();
  const {
    data: user,
    isPending: isUserPending,
    error: userError,
  } = useCurrentUser();

  const form = useForm<TimetableFilterFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const values = form.watch();

  const [, setFilter] = usePersistedState<TimetableFilterFormSchema>(
    TIMETABLE_FILTER,
    {
      mode: form.getValues("mode"),
      group: form.getValues("group"),
      lecturer: form.getValues("lecturer"),
      classroom: form.getValues("classroom"),
    },
  );

  useEffect(() => {
    if (userError) {
      console.error(userError);
      toast.error("Ошибка получения данных о пользователе");
    }
  }, [userError]);

  const onSubmit = form.handleSubmit((values) => {
    setFilter(values);
    navigate("/timetable");
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.faculty || user.course || user.group) {
      if (user.faculty) {
        const label = findByValue(user.faculty, facultyOptions);
        if (label) {
          form.setValue("group.faculty", {
            value: user.faculty,
            label,
          });
        }
      }
      if (user.course) {
        const label = findByValue(user.course, courseOptions);
        if (label) {
          form.setValue("group.course", {
            value: user.course,
            label,
          });
        }
      }
      if (user.group) {
        const label = findByValue(user.group, groupOptions);
        if (label) {
          form.setValue("group.group", {
            value: user.group,
            label,
          });
        }
      }
      form.setValue("mode", {
        value: TimetableMode.group,
        label: timetableModeLabel[TimetableMode.group],
      });
    }

    if (user.role === Role.lecturer) {
      form.setValue("lecturer.firstName", user.firstName);
      form.setValue("lecturer.lastName", user.lastName);
      form.setValue("lecturer.middleName", user.middleName);
      form.setValue("mode", {
        value: TimetableMode.lecturer,
        label: timetableModeLabel[TimetableMode.lecturer],
      });
    }

    form.trigger();
  }, [user, form]);

  if (isUserPending) {
    <Wrapper>
      <Header title="Расписание" onClickLeft={() => navigate(-1)} />
      <Layout>
        <div className="flex grow items-center justify-center">
          <Loader color="primary" />
        </div>
      </Layout>
    </Wrapper>;
  }

  return (
    <Wrapper>
      <Header title="Расписание" onClickLeft={() => navigate(-1)} />
      <Layout>
        <div className="flex grow flex-col space-y-6">
          <form onSubmit={onSubmit} className="flex grow flex-col">
            <div className="flex grow flex-col space-y-4">
              <Controller
                name="mode"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <DrawerSelect
                      placeholder="Формат отображения"
                      options={timetableModeOptions}
                      selectedOption={form.getValues("mode")}
                      onChange={(value) => {
                        field.onChange(value);
                        form.resetField("group");
                        form.resetField("lecturer");
                        form.resetField("classroom");
                      }}
                      displayedProperty="label"
                    />
                  </Field>
                )}
              />
              {values.mode.value === TimetableMode.group && (
                <GroupFilter form={form} />
              )}
              {values.mode.value === TimetableMode.lecturer && (
                <LecturerFilter form={form} />
              )}
              {values.mode.value === TimetableMode.classroom && (
                <ClassroomFilter form={form} />
              )}
            </div>

            <Bottom>
              <Button block disabled={!form.formState.isValid}>
                Показать расписание
              </Button>
            </Bottom>
          </form>
        </div>
      </Layout>
      <Navbar />
    </Wrapper>
  );
};

export default TimetableFilter;
