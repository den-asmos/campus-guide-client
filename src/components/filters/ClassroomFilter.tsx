import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { TimetableFilterFormSchema } from "@/schemas/timetableFilterFormSchema";
import { Controller, type UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<TimetableFilterFormSchema>;
};

const ClassroomFilter = ({ form }: Props) => {
  return (
    <Controller
      name="classroom.classroom"
      control={form.control}
      render={({ field }) => (
        <Field>
          <FieldLabel>Номер аудитории</FieldLabel>
          <Input type="text" {...field} />
        </Field>
      )}
    />
  );
};

export default ClassroomFilter;
