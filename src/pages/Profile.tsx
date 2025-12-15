import Bottom from "@/components/Bottom";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import DrawerSelect from "@/components/ui/drawer-select";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/UserAvatar";
import Wrapper from "@/components/Wrapper";
import {
	courseOptions,
	facultyOptions,
	genderOptions,
	groupOptions,
} from "@/lib/constants";
import { dateOptions, dateParams } from "@/lib/maskito/date";
import { toDate } from "@/lib/time";
import {
	filterCourseOptions,
	filterGroupOptions,
	findByValue,
	getErrorMessage,
} from "@/lib/utils";
import {
	formSchema,
	type ProfileFormSchema,
} from "@/schemas/profileFormSchema";
import { useSignOut } from "@/services/auth/query/use-auth";
import { useCurrentUser, useUpdateUser } from "@/services/user/query/use-user";
import { roleLabel } from "@/services/user/types";
import { hasUserChanged, mapUpdateUserRequest } from "@/services/user/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { maskitoStringifyDate } from "@maskito/kit";
import { useMaskito } from "@maskito/react";
import type { AxiosError } from "axios";
import { LogOut } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const defaultValues = {
	birthDate: "",
	faculty: undefined,
	course: undefined,
	group: undefined,
	gender: undefined,
};

const Profile = () => {
	const navigate = useNavigate();
	const {
		data: user,
		isPending: isUserPending,
		error: userError,
	} = useCurrentUser();
	const { mutateAsync: updateUser, isPending: isUpdatePending } =
		useUpdateUser();
	const { mutateAsync: signOut, isPending: isSignOutPending } = useSignOut();

	useEffect(() => {
		if (userError) {
			console.error(userError);
			toast.error("Ошибка получения данных о пользователе");
		}
	}, [userError]);

	const dateRef = useMaskito({ options: dateOptions });

	const form = useForm<ProfileFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const values = form.watch();

	const onSubmit = form.handleSubmit(async (values) => {
		try {
			const request = mapUpdateUserRequest(values);
			await updateUser(request);
			toast.success("Данные изменены");
		} catch (error) {
			console.error(error);
			const errorMessage =
				getErrorMessage(error as AxiosError) || "Ошибка изменения данных";
			toast.error(errorMessage);
		}
	});

	useEffect(() => {
		form.setValue(
			"birthDate",
			user?.birthDate
				? maskitoStringifyDate(toDate(user.birthDate, "YYYY.MM.DD"), dateParams)
				: ""
		);

		if (user?.faculty) {
			const label = findByValue(user.faculty, facultyOptions);
			if (label) {
				form.setValue("faculty", {
					value: user.faculty,
					label,
				});
			}
		}
		if (user?.course) {
			const label = findByValue(user.course, courseOptions);
			if (label) {
				form.setValue("course", {
					value: user.course,
					label,
				});
			}
		}
		if (user?.group) {
			const label = findByValue(user.group, groupOptions);
			if (label) {
				form.setValue("group", {
					value: user.group,
					label,
				});
			}
		}
		if (user?.gender) {
			const label = findByValue(user.gender, genderOptions);
			if (label) {
				form.setValue("gender", {
					value: user.gender,
					label,
				});
			}
		}
	}, [user, form]);

	const isSubmitEnabled = () => {
		return (
			form.formState.isValid &&
			form.formState.isDirty &&
			hasUserChanged(user, values)
		);
	};

	const handleSignOut = async () => {
		await signOut();
	};

	if (isUserPending || isSignOutPending) {
		return (
			<Wrapper>
				<Header
					title="Профиль"
					onClickLeft={() => navigate(-1)}
					onClickRight={handleSignOut}
					rightIcon={<LogOut className="size-5" />}
				/>

				<div className="flex flex-grow justify-center items-center">
					<Loader color="primary" />
				</div>
			</Wrapper>
		);
	}

	if (!user) {
		return <Navigate to="/sign-in" />;
	}

	return (
		<Wrapper>
			<Header
				title="Профиль"
				onClickLeft={() => navigate(-1)}
				onClickRight={handleSignOut}
				rightIcon={<LogOut className="size-5" />}
			/>
			<Layout>
				<form onSubmit={onSubmit} className="flex flex-col flex-grow">
					<div className="flex flex-col flex-grow space-y-6 mb-6">
						<div className="flex items-center space-x-4">
							<UserAvatar
								avatar={user.avatar}
								firstName={user.firstName}
								lastName={user.lastName}
								variant="profile"
							/>

							<div className="flex flex-col space-y-1">
								<p className="text-lg leading-none">
									{user.firstName} {user.lastName}
								</p>
								<p className="text-sm text-muted-foreground">
									{roleLabel[user.role]}
								</p>
							</div>
						</div>

						<FieldGroup>
							<div className="flex flex-col space-y-4">
								<Controller
									name="birthDate"
									control={form.control}
									render={({ field }) => (
										<Field>
											<FieldLabel>Дата рождения</FieldLabel>
											<Input type="string" {...field} ref={dateRef} />
										</Field>
									)}
								/>

								<Controller
									name="faculty"
									control={form.control}
									render={({ field }) => (
										<Field>
											<FieldLabel>Факультет</FieldLabel>
											<DrawerSelect
												placeholder="Выберите факультет"
												options={facultyOptions}
												selectedOption={form.getValues("faculty")}
												onChange={field.onChange}
												displayedProperty="value"
											/>
										</Field>
									)}
								/>

								<Controller
									name="course"
									control={form.control}
									render={({ field }) => (
										<Field>
											<FieldLabel>Курс</FieldLabel>
											<DrawerSelect
												placeholder="Выберите курс"
												options={filterCourseOptions(values.faculty?.value)}
												selectedOption={form.getValues("course")}
												onChange={field.onChange}
												disabled={!values.faculty}
											/>
										</Field>
									)}
								/>

								<Controller
									name="group"
									control={form.control}
									render={({ field }) => (
										<Field>
											<FieldLabel>Группа</FieldLabel>
											<DrawerSelect
												placeholder="Выберите группу"
												options={filterGroupOptions(
													values.faculty?.value,
													values.course?.value
												)}
												selectedOption={form.getValues("group")}
												onChange={field.onChange}
												disabled={!values.faculty || !values.course}
											/>
										</Field>
									)}
								/>

								<Controller
									name="gender"
									control={form.control}
									render={({ field }) => (
										<Field>
											<FieldLabel>Пол</FieldLabel>
											<DrawerSelect
												placeholder="Выберите пол"
												options={genderOptions}
												selectedOption={form.getValues("gender")}
												onChange={field.onChange}
											/>
										</Field>
									)}
								/>
							</div>
						</FieldGroup>
					</div>

					<Bottom>
						<Button block disabled={!isSubmitEnabled()}>
							{isUpdatePending ? <Loader /> : "Сохранить"}
						</Button>
					</Bottom>
				</form>
			</Layout>
		</Wrapper>
	);
};

export default Profile;
