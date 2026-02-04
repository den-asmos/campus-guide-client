import Bottom from "@/components/Bottom";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import DrawerSelect from "@/components/ui/drawer-select";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Wrapper from "@/components/Wrapper";
import { roleOptions } from "@/lib/constants";
import { getErrorMessage } from "@/lib/utils";
import { formSchema, type SignUpFormSchema } from "@/schemas/signUpFormSchema";
import { useSignUp } from "@/services/auth/query/use-auth";
import { Role } from "@/services/user/types";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const defaultValues = {
	login: "",
	email: "",
	password: "",
	passwordConfirmation: "",
	role: undefined,
	firstName: "",
	lastName: "",
	middleName: "",
};

const SignUp = () => {
	const navigate = useNavigate();
	const { mutateAsync, isPending } = useSignUp();

	const form = useForm<SignUpFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const onSubmit = form.handleSubmit(async (values) => {
		try {
			await mutateAsync({
				login: values.login,
				email: values.email,
				password: values.password,
				role: values.role.value,
				firstName: values.firstName,
				lastName: values.lastName,
				middleName: values.middleName,
			});
			navigate("/");
		} catch (error) {
			console.error(error);
			const errorMessage =
				getErrorMessage(error as AxiosError) || "Ошибка регистрации";
			toast.error(errorMessage);
		}
	});

	return (
		<Wrapper>
			<Layout>
				<form onSubmit={onSubmit} className="flex flex-col flex-grow">
					<Logo />

					<FieldGroup className="flex flex-col flex-grow mb-6">
						<div className="flex flex-col flex-grow space-y-5 justify-center">
							<h1 className="text-3xl text-center font-semibold">
								Регистрация
							</h1>

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
								name="email"
								control={form.control}
								render={({ field }) => (
									<Field>
										<FieldLabel>Email</FieldLabel>
										<Input type="email" {...field} />
									</Field>
								)}
							/>

							<Controller
								name="role"
								control={form.control}
								render={({ field }) => (
									<Field>
										<FieldLabel>Роль</FieldLabel>
										<DrawerSelect
											placeholder="Выберите роль"
											options={roleOptions.filter(
												(role) => role.value !== Role.admin
											)}
											selectedOption={form.getValues("role")}
											onChange={field.onChange}
										/>
									</Field>
								)}
							/>

							<Controller
								name="firstName"
								control={form.control}
								render={({ field }) => (
									<Field>
										<FieldLabel>Имя</FieldLabel>
										<Input className="capitalize" type="text" {...field} />
									</Field>
								)}
							/>

							<Controller
								name="lastName"
								control={form.control}
								render={({ field }) => (
									<Field>
										<FieldLabel>Фамилия</FieldLabel>
										<Input className="capitalize" type="text" {...field} />
									</Field>
								)}
							/>

							<Controller
								name="middleName"
								control={form.control}
								render={({ field }) => (
									<Field>
										<FieldLabel>Отчество</FieldLabel>
										<Input className="capitalize" type="text" {...field} />
									</Field>
								)}
							/>

							<Controller
								name="password"
								control={form.control}
								render={({ field }) => (
									<Field>
										<FieldLabel>Пароль</FieldLabel>
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

							<Link to="/sign-in" className="text-button-primary text-center">
								Уже есть аккаунт?
							</Link>
						</div>
					</FieldGroup>

					<Bottom>
						<Button block disabled={!form.formState.isValid || isPending}>
							{isPending ? <Loader /> : "Зарегистрироваться"}
						</Button>
					</Bottom>
				</form>
			</Layout>
		</Wrapper>
	);
};

export default SignUp;
