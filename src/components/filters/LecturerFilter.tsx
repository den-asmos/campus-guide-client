import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { TimetableFilterFormSchema } from "@/schemas/timetableFilterFormSchema";
import { Controller, type UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<TimetableFilterFormSchema>;
};

const LecturerFilter = ({ form }: Props) => {
  return (
    <div className="flex flex-col space-y-2">
      <Controller
        name="lecturer.lastName"
        control={form.control}
        render={({ field }) => (
          <Field>
            <FieldLabel>Фамилия</FieldLabel>
            <Input type="text" {...field} />
          </Field>
        )}
      />
      <Controller
        name="lecturer.firstName"
        control={form.control}
        render={({ field }) => (
          <Field>
            <FieldLabel>Имя</FieldLabel>
            <Input type="text" {...field} />
          </Field>
        )}
      />
      <Controller
        name="lecturer.middleName"
        control={form.control}
        render={({ field }) => (
          <Field>
            <FieldLabel>Отчество</FieldLabel>
            <Input type="text" {...field} />
          </Field>
        )}
      />
    </div>
  );
};

export default LecturerFilter;
