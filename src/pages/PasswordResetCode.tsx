import Bottom from "@/components/Bottom";
import Countdown from "@/components/Countdown";
import Header from "@/components/Header";
import Hint from "@/components/Hint";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import Wrapper from "@/components/Wrapper";
import {
	usePersistedCountdown,
	usePersistedState,
} from "@/hooks/usePersistedState";
import { PASSWORD_RESET } from "@/lib/constants";
import { getErrorMessage } from "@/lib/utils";
import { formSchema, type CodeFormSchema } from "@/schemas/codeFormSchema";
import { useCurrentUser } from "@/services/auth/query/use-auth";
import {
	useRequestPasswordReset,
	useVerifyCode,
} from "@/services/user/query/use-password-reset";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const defaultValues = {
	code: "",
};

const PasswordResetCode = () => {
	const navigate = useNavigate();
	const [step, setStep, clearStep] = usePersistedState<"email" | "code">(
		PASSWORD_RESET.STEP_KEY,
		"email",
	);
	const [, setCode] = usePersistedState<string>(PASSWORD_RESET.CODE_KEY, "");
	const [, setEmail] = usePersistedState<string>(PASSWORD_RESET.EMAIL_KEY, "");
	const countdown = usePersistedCountdown(
		PASSWORD_RESET.COUNTDOWN_KEY,
		PASSWORD_RESET.RESEND_COOLDOWN,
	);

	const {
		data: user,
		isPending: isUserPending,
		error: userError,
	} = useCurrentUser();
	const { mutateAsync: requestReset, isPending: isRequestResetPending } =
		useRequestPasswordReset();
	const { mutateAsync: verifyCode, isPending: isVerifyCodePending } =
		useVerifyCode();

	const form = useForm<CodeFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	useEffect(() => {
		if (userError) {
			console.error(userError);
			toast.error("Ошибка получения данных о пользователе");
		}
	}, [user, userError]);

	const clearPersistedData = () => {
		clearStep();
		countdown.reset();
	};

	const handleRequestCode = async () => {
		if (!user) {
			return;
		}

		try {
			await requestReset(user.email);
			setStep("code");
			countdown.start(PASSWORD_RESET.RESEND_COOLDOWN);
			toast.success("Код подтверждения отправлен на вашу почту");
		} catch (error) {
			console.error(error);
			const errorMessage =
				getErrorMessage(error as AxiosError) || "Ошибка обработки запроса";
			toast.error(errorMessage);
		}
	};

	const handleResendCode = async () => {
		if (!user) {
			return;
		}

		try {
			await requestReset(user.email);
			form.reset();
			toast.success("Новый код отправлен на вашу почту");
		} catch (error) {
			console.error(error);
			const errorMessage =
				getErrorMessage(error as AxiosError) || "Ошибка обработки запроса";
			toast.error(errorMessage);
		}
	};

	const handleVerifyCode = form.handleSubmit(async (values) => {
		if (!user) {
			return;
		}

		try {
			await verifyCode({ code: values.code, email: user.email });
			setCode(values.code);
			setEmail(user.email);
			clearPersistedData();
			navigate("/password-reset");
		} catch (error) {
			console.error(error);
			const errorMessage =
				getErrorMessage(error as AxiosError) || "Ошибка обработки запроса";
			toast.error(errorMessage);
		}
	});

	const navigateBack = () => {
		if (step === "code") {
			setStep("email");
			form.reset();
			countdown.reset();
		} else {
			clearPersistedData();
			navigate(-1);
		}
	};

	if (isUserPending) {
		return (
			<Wrapper>
				<Header title="Сброс пароля" onClickLeft={navigateBack} />

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
			<Header title="Сброс пароля" onClickLeft={navigateBack} />
			<Layout>
				<form onSubmit={handleVerifyCode} className="flex flex-col flex-grow">
					<FieldGroup className="flex flex-col flex-grow mb-6">
						<div className="flex flex-col flex-1 space-y-5">
							<Hint className="text-center">
								На Вашу электронную почту будет выслан 6-значный код
								подтверждения
							</Hint>

							<Input type="email" value={user.email} readOnly />
						</div>

						{step === "code" && (
							<div className="flex flex-col flex-2 space-y-5">
								<Controller
									name="code"
									control={form.control}
									render={({ field }) => (
										<Field>
											<InputOTP maxLength={6} {...field}>
												<InputOTPGroup>
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
													<InputOTPSlot index={2} />
													<InputOTPSlot index={3} />
													<InputOTPSlot index={4} />
													<InputOTPSlot index={5} />
												</InputOTPGroup>
											</InputOTP>
										</Field>
									)}
								/>

								<Countdown
									cooldown={PASSWORD_RESET.RESEND_COOLDOWN}
									label="Повторно оправить код можно через"
									buttonTitle="Отправить код повторно"
									disabled={isRequestResetPending}
									onCountdownEnd={handleResendCode}
								/>
							</div>
						)}
					</FieldGroup>

					{step === "email" ? (
						<Bottom>
							<Button
								onClick={handleRequestCode}
								block
								type="button"
								disabled={!user || isRequestResetPending}
							>
								{isRequestResetPending ? <Loader /> : "Выслать код"}
							</Button>
						</Bottom>
					) : (
						<Bottom>
							<Button
								block
								disabled={!form.formState.isValid || isVerifyCodePending}
							>
								{isVerifyCodePending ? <Loader /> : "Подтвердить"}
							</Button>
						</Bottom>
					)}
				</form>
			</Layout>
		</Wrapper>
	);
};

export default PasswordResetCode;
