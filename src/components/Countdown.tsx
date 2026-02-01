import { Progress } from "@/components/ui/progress";
import { usePersistedCountdown } from "@/hooks/usePersistedState";
import { PASSWORD_RESET } from "@/lib/constants";
import { formatCountdownTime } from "@/lib/time";
import { Button } from "./ui/button";

type Props = {
	cooldown: number;
	label: string;
	buttonTitle: string;
	disabled: boolean;
	onCountdownEnd: () => Promise<void>;
};

const Countdown = ({
	cooldown = 60,
	label,
	buttonTitle,
	disabled,
	onCountdownEnd,
}: Props) => {
	const { countdown, start, isActive } = usePersistedCountdown(
		PASSWORD_RESET.COUNTDOWN_KEY,
		cooldown,
	);

	const progressPercentage = 100 - ((cooldown - countdown) / cooldown) * 100;

	const onClick = async () => {
		if (isActive) {
			return;
		}
		await onCountdownEnd();
		start(cooldown);
	};

	return (
		<div className="space-y-2">
			{isActive ? (
				<div className="space-y-2">
					<p className="text-sm text-center">
						{label}{" "}
						<span className="font-semibold text-button-dark tabular-nums">
							{formatCountdownTime(countdown)}
						</span>
					</p>

					<Progress value={progressPercentage} />
				</div>
			) : (
				<div className="text-center">
					<Button
						onClick={onClick}
						variant="link"
						type="button"
						disabled={disabled}
					>
						{buttonTitle}
					</Button>
				</div>
			)}
		</div>
	);
};

export default Countdown;
