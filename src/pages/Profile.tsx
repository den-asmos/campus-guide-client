import AvatarUploadDrawer from "@/components/AvatarUploadDrawer";
import Bottom from "@/components/Bottom";
import Dialog from "@/components/Dialog";
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
  MAX_IMAGE_SIZE,
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
import { useCurrentUser, useSignOut } from "@/services/auth/query/use-auth";
import {
  useDeleteAvatar,
  useUpdateAvatar,
  useUpdateUser,
} from "@/services/user/query/use-user";
import { roleLabel } from "@/services/user/types";
import { hasUserChanged, mapUpdateUserRequest } from "@/services/user/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { maskitoStringifyDate } from "@maskito/kit";
import { useMaskito } from "@maskito/react";
import type { AxiosError } from "axios";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [isAvatarUploadDrawerOpen, setIsAvatarUploadDrawerOpen] =
    useState(false);
  const {
    data: user,
    isPending: isUserPending,
    error: userError,
    refetch: refetchUser,
  } = useCurrentUser();
  const { mutateAsync: updateUser, isPending: isUpdateUserPending } =
    useUpdateUser();
  const { mutateAsync: updateAvatar, isPending: isUpdateAvatarPending } =
    useUpdateAvatar();
  const { mutateAsync: deleteAvatar, isPending: isDeleteAvatarPending } =
    useDeleteAvatar();
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

  const handleUpdateAvatar = async (avatar: File) => {
    if (avatar.size > MAX_IMAGE_SIZE) {
      toast.error("Размер изображения должен быть меньше 5 мб");
    }

    try {
      const response = await updateAvatar(avatar);
      await refetchUser();
      toast.success(response.message);
      setIsAvatarUploadDrawerOpen(false);
    } catch (error) {
      console.error(error);
      const errorMessage =
        getErrorMessage(error as AxiosError) || "Ошибка изменения аватара";
      toast.error(errorMessage);
    }
  };

  const handleDeleteAvatar = async () => {
    if (!user?.avatar) {
      return;
    }

    try {
      const response = await deleteAvatar();
      await refetchUser();
      toast.success(response.message);
      setIsAvatarUploadDrawerOpen(false);
    } catch (error) {
      console.error(error);
      const errorMessage =
        getErrorMessage(error as AxiosError) || "Ошибка удаления аватара";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    form.setValue(
      "birthDate",
      user?.birthDate
        ? maskitoStringifyDate(toDate(user.birthDate, "YYYY.MM.DD"), dateParams)
        : "",
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
          rightIcon={
            <Dialog
              title="Выход"
              description="Вы уверены, что хотите выйти из приложения?"
              cancelButtonTitle="Отмена"
              submitButtonTitle="Выйти"
              onSubmit={handleSignOut}
            >
              <LogOut className="size-5" />
            </Dialog>
          }
        />
        <Layout>
          <div className="flex grow items-center justify-center">
            <Loader color="primary" />
          </div>
        </Layout>
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
        rightIcon={
          <Dialog
            title="Выход"
            description="Вы уверены, что хотите выйти из приложения?"
            cancelButtonTitle="Отмена"
            submitButtonTitle="Выйти"
            onSubmit={handleSignOut}
          >
            <LogOut className="size-5" />
          </Dialog>
        }
      />
      <Layout>
        <form onSubmit={onSubmit} className="flex grow flex-col">
          <div className="mb-6 flex grow flex-col space-y-6">
            <div className="flex items-center space-x-4">
              <UserAvatar
                avatar={user.avatar}
                firstName={user.firstName}
                lastName={user.lastName}
                variant="profile"
                onClick={() => setIsAvatarUploadDrawerOpen(true)}
              />

              <div className="flex flex-col space-y-1">
                <p className="text-lg leading-none">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-muted-foreground text-sm">
                  {roleLabel[user.role]}
                </p>
              </div>
            </div>

            <AvatarUploadDrawer
              isOpen={isAvatarUploadDrawerOpen}
              setIsOpen={setIsAvatarUploadDrawerOpen}
              isLoading={isUpdateAvatarPending || isDeleteAvatarPending}
              hasUploadedAvatar={!!user.avatar}
              onSubmit={handleUpdateAvatar}
              onDelete={handleDeleteAvatar}
            />

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
                          values.course?.value,
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
            <Button
              onClick={() => navigate("/password-reset/code")}
              block
              type="button"
              variant="outline"
            >
              Сбросить пароль
            </Button>
            {isSubmitEnabled() && (
              <Button
                block
                disabled={!isSubmitEnabled() || isUpdateUserPending}
              >
                {isUpdateUserPending ? <Loader /> : "Сохранить"}
              </Button>
            )}
          </Bottom>
        </form>
      </Layout>
    </Wrapper>
  );
};

export default Profile;
