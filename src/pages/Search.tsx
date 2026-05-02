import ClassroomCard from "@/components/cards/ClassroomCard";
import Header from "@/components/Header";
import Hint from "@/components/Hint";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Wrapper from "@/components/Wrapper";
import { useDebounce } from "@/hooks/useDebounce";
import { formSchema, type SearchFormSchema } from "@/schemas/searchFormSchema";
import { useSearchClassroom } from "@/services/classroom/query/use-classroom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  query: "",
};

const Search = () => {
  const navigate = useNavigate();

  const form = useForm<SearchFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const query = form.watch("query");

  const debouncedSearch = useDebounce(query);
  const { data, isLoading, isFetched } = useSearchClassroom(debouncedSearch);

  return (
    <Wrapper>
      <Header title="Поиск" onClickLeft={() => navigate(-1)} />
      <Layout>
        <form>
          <FieldGroup className="mb-6 flex grow flex-col">
            <div className="flex grow flex-col justify-center space-y-5">
              <Controller
                name="query"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Аудитория</FieldLabel>
                    <span className="relative">
                      <Input
                        type="text"
                        placeholder="Начните вводить номер или название"
                        variant="icon-left"
                        {...field}
                      />
                      <SearchIcon className="text-muted-foreground absolute top-1/2 left-2 flex size-5 -translate-y-1/2" />
                    </span>
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </form>

        <div className="flex max-h-[75vh] grow flex-col space-y-4 overflow-y-scroll">
          {isLoading && !data ? (
            <Loader color="primary" />
          ) : (
            data?.classrooms.map((classroom) => (
              <ClassroomCard key={classroom.id} classroom={classroom} />
            ))
          )}

          {isFetched && !data?.classrooms.length && (
            <Hint className="text-center">Ничего не нашлось</Hint>
          )}
        </div>
      </Layout>
      <Navbar />
    </Wrapper>
  );
};

export default Search;
