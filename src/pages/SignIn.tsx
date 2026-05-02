import Bottom from "@/components/Bottom";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Wrapper from "@/components/Wrapper";
import { getErrorMessage } from "@/lib/utils";
import { formSchema, type SignInFormSchema } from "@/schemas/signInFormSchema";
import { useSignIn } from "@/services/auth/query/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const defaultValues = {
  login: "",
  password: "",
};

const SignIn = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useSignIn();

  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await mutateAsync(values);
      navigate("/");
    } catch (error) {
      console.error(error);
      const errorMessage =
        getErrorMessage(error as AxiosError) || "Ошибка входа";
      toast.error(errorMessage);
    }
  });

  return (
    <Wrapper>
      <Layout>
        <form onSubmit={onSubmit} className="flex grow flex-col">
          <Logo />

          <FieldGroup className="mb-6 flex grow flex-col">
            <div className="flex grow flex-col justify-center space-y-5">
              <h1 className="text-center text-3xl font-semibold">Вход</h1>

              <Controller
                name="login"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Логин</FieldLabel>
                    <Input type="text" {...field} />
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Пароль</FieldLabel>
                    <Input type="password" {...field} />
                  </Field>
                )}
              />

              <div className="flex flex-col space-y-2">
                <Link to="/sign-up" className="text-button-primary text-center">
                  Ещё нет аккаунта?
                </Link>

                <Link
                  to="/password-reset/email"
                  className="text-button-primary text-center text-sm"
                >
                  Забыли пароль?
                </Link>
              </div>
            </div>
          </FieldGroup>

          <Bottom>
            <Button block disabled={!form.formState.isValid || isPending}>
              {isPending ? <Loader /> : "Войти"}
            </Button>
          </Bottom>
        </form>
      </Layout>
    </Wrapper>
  );
};

export default SignIn;
