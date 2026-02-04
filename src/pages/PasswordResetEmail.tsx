import Bottom from "@/components/Bottom";
import Countdown from "@/components/Countdown";
import Hint from "@/components/Hint";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import Wrapper from "@/components/Wrapper";
import { useAuth } from "@/hooks/useAuth";
import {
	usePersistedCountdown,
	usePersistedState,
} from "@/hooks/usePersistedState";
import { PASSWORD_RESET } from "@/lib/constants";
import { getErrorMessage } from "@/lib/utils";
import {
	formSchema as codeFormSchema,
	type CodeFormSchema,
} from "@/schemas/codeFormSchema";
import {
	formSchema as emailFormSchema,
	type EmailFormSchema,
} from "@/schemas/emailFormSchema";
import {
	useRequestPasswordReset,
	useVerifyCode,
} from "@/services/user/query/use-password-reset";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PasswordResetEmail = () => {
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

	const { isTokenValid } = useAuth();
	const { mutateAsync: requestReset, isPending: isRequestResetPending } =
		useRequestPasswordReset();
	const { mutateAsync: verifyCode, isPending: isVerifyCodePending } =
		useVerifyCode();

	const emailForm = useForm<EmailFormSchema>({
		resolver: zodResolver(emailFormSchema),
		defaultValues: { email: "" },
	});

	const codeForm = useForm<CodeFormSchema>({
		resolver: zodResolver(codeFormSchema),
		defaultValues: { code: "" },
	});

	const clearPersistedData = () => {
		clearStep();
		countdown.reset();
	};

	const handleRequestCode = emailForm.handleSubmit(async (values) => {
		try {
			await requestReset(values.email);
			setStep("code");
			countdown.start(PASSWORD_RESET.RESEND_COOLDOWN);
			toast.success("Код подтверждения отправлен на вашу почту");
		} catch (error) {
			console.error(error);
			const errorMessage =
				getErrorMessage(error as AxiosError) || "Ошибка обработки запроса";
			toast.error(errorMessage);
		}
	});

	const handleResendCode = async () => {
		try {
			await requestReset(emailForm.getValues("email"));
			codeForm.reset();
			toast.success("Новый код отправлен на вашу почту");
		} catch (error) {
			console.error(error);
			const errorMessage =
				getErrorMessage(error as AxiosError) || "Ошибка обработки запроса";
			toast.error(errorMessage);
		}
	};

	const handleVerifyCode = codeForm.handleSubmit(async (values) => {
		try {
			await verifyCode({
				code: values.code,
				email: emailForm.getValues("email"),
			});
			setCode(values.code);
			setEmail(emailForm.getValues("email"));
			clearPersistedData();
			navigate("/password-reset");
		} catch (error) {
			console.error(error);
			const errorMessage =
				getErrorMessage(error as AxiosError) || "Ошибка обработки запроса";
			toast.error(errorMessage);
		}
	});

	if (isTokenValid) {
		return <Navigate to="/password-reset/code" />;
	}

	return (
		<Wrapper>
			<Layout>
				{step === "email" ? (
					<form
						onSubmit={handleRequestCode}
						className="flex flex-col flex-grow"
					>
						<Logo />
						<FieldGroup className="flex flex-col flex-grow mb-6">
							<div className="flex flex-col flex-grow space-y-5 justify-center">
								<h1 className="text-3xl text-center font-semibold">
									Сброс пароля
								</h1>
								<Hint className="text-center">
									На Вашу электронную почту будет выслан 6-значный код
									подтверждения
								</Hint>

								<Controller
									name="email"
									control={emailForm.control}
									render={({ field }) => (
										<Field>
											<FieldLabel>Email</FieldLabel>
											<Input type="email" {...field} />
										</Field>
									)}
								/>
							</div>
						</FieldGroup>
						<Bottom>
							<Button
								onClick={handleRequestCode}
								block
								type="button"
								disabled={!emailForm.formState.isValid || isRequestResetPending}
							>
								{isRequestResetPending ? <Loader /> : "Выслать код"}
							</Button>
						</Bottom>
					</form>
				) : (
					<form onSubmit={handleVerifyCode} className="flex flex-col flex-grow">
						<Logo />
						<FieldGroup className="flex flex-col flex-grow mb-6">
							<div className="flex flex-col flex-grow space-y-5 justify-center">
								<h1 className="text-3xl text-center font-semibold">
									Сброс пароля
								</h1>

								<Controller
									name="code"
									control={codeForm.control}
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
						</FieldGroup>

						<Bottom>
							<Button
								block
								disabled={!codeForm.formState.isValid || isVerifyCodePending}
							>
								{isVerifyCodePending ? <Loader /> : "Подтвердить"}
							</Button>
						</Bottom>
					</form>
				)}
			</Layout>
		</Wrapper>
	);
};

export default PasswordResetEmail;
