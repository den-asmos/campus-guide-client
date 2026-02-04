import Bottom from "@/components/Bottom";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Wrapper from "@/components/Wrapper";
import { usePersistedState } from "@/hooks/usePersistedState";
import { PASSWORD_RESET } from "@/lib/constants";
import { getErrorMessage } from "@/lib/utils";
import {
	formSchema,
	type PasswordFormSchema,
} from "@/schemas/passwordFormSchema";
import { useSignOut } from "@/services/auth/query/use-auth";
import { useResetPassword } from "@/services/user/query/use-password-reset";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const defaultValues = {
	password: "",
	passwordConfirmation: "",
};

const PasswordReset = () => {
	const navigate = useNavigate();
	const [code] = usePersistedState(PASSWORD_RESET.CODE_KEY, "");
	const [email] = usePersistedState(PASSWORD_RESET.EMAIL_KEY, "");
	const { mutateAsync: resetPassword, isPending } = useResetPassword();
	const { mutateAsync: signOut } = useSignOut();
	
	const form = useForm<PasswordFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const onSubmit = form.handleSubmit(async (values) => {
		try {
			await resetPassword({ password: values.password, code, email });
			toast.success("Пароль изменён");
			await signOut();
			navigate("/sign-in");
		} catch (error) {
			console.error(error);
			const errorMessage =
				getErrorMessage(error as AxiosError) || "Ошибка смены пароля";
			toast.error(errorMessage);
		}
	});

	return (
		<Wrapper>
			<Header title="Сброс пароля" onClickLeft={() => navigate(-1)} />
			<Layout>
				<form onSubmit={onSubmit} className="flex flex-col flex-grow">
					<FieldGroup className="flex flex-col flex-grow justify-center space-y-5 mb-6">
						<Controller
							name="password"
							control={form.control}
							render={({ field }) => (
								<Field>
									<FieldLabel>Новый пароль</FieldLabel>
									<FieldDescription>Минимум 6 символов</FieldDescription>
									<Input type="password" {...field} />
								</Field>
							)}
						/>

						<Controller
							name="passwordConfirmation"
							control={form.control}
							render={({ field }) => (
								<Field>
									<FieldLabel>Подтверждение пароля</FieldLabel>
									<Input type="password" {...field} />
								</Field>
							)}
						/>
					</FieldGroup>

					<Bottom>
						<Button block disabled={!form.formState.isValid || isPending}>
							{isPending ? <Loader /> : "Сменить пароль"}
						</Button>
					</Bottom>
				</form>
			</Layout>
		</Wrapper>
	);
};

export default PasswordReset;
