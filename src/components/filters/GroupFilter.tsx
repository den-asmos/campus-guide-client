import DrawerSelect from "@/components/ui/drawer-select";
import { Field } from "@/components/ui/field";
import { facultyOptions } from "@/lib/constants";
import { filterCourseOptions, filterGroupOptions } from "@/lib/utils";
import type { TimetableFilterFormSchema } from "@/schemas/timetableFilterFormSchema";
import { Controller, type UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<TimetableFilterFormSchema>;
};

const GroupFilter = ({ form }: Props) => {
  return (
    <div className="flex flex-col space-y-2">
      <Controller
        name="group.faculty"
        control={form.control}
        render={({ field }) => (
          <Field>
            <DrawerSelect
              placeholder="Факультет"
              options={facultyOptions}
              selectedOption={form.getValues("group.faculty")}
              onChange={(value) => {
                form.resetField("group.course");
                form.resetField("group.group");
                field.onChange(value);
              }}
              displayedProperty="value"
            />
          </Field>
        )}
      />

      <Controller
        name="group.course"
        control={form.control}
        render={({ field }) => (
          <Field>
            <DrawerSelect
              placeholder="Курс"
              options={filterCourseOptions(
                form.getValues("group.faculty.value"),
              )}
              selectedOption={form.getValues("group.course")}
              onChange={(value) => {
                form.resetField("group.group");
                field.onChange(value);
              }}
              disabled={!form.getValues("group.faculty")}
              displayedProperty="value"
            />
          </Field>
        )}
      />

      <Controller
        name="group.group"
        control={form.control}
        render={({ field }) => (
          <Field>
            <DrawerSelect
              placeholder="Группа"
              options={filterGroupOptions(
                form.getValues("group.faculty.value"),
                form.getValues("group.course.value"),
              )}
              selectedOption={form.getValues("group.group")}
              onChange={field.onChange}
              disabled={
                !form.getValues("group.faculty") ||
                !form.getValues("group.course")
              }
            />
          </Field>
        )}
      />
    </div>
  );
};

export default GroupFilter;
