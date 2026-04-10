import { Card } from "@/components/ui/card";
import type { TimetableLesson } from "@/services/timetable/types";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
	lesson: Array<TimetableLesson & { subgroupName: string }>;
	variant?: "md" | "sm";
};

const TimetableLessonCard = ({ lesson, variant = "md" }: Props) => {
	const navigate = useNavigate();

	const onClick = (subgroup: TimetableLesson & { subgroupName: string }) => {
		navigate("/lesson", {
			state: { subgroup },
		});
	};

	if (variant === "sm") {
		return (
			<div className="min-w-full py-2 flex flex-col space-y-3">
				{lesson.map((subgroup, index) => (
					<Card
						onClick={() => onClick(subgroup)}
						key={`${subgroup.number}-${index}`}
						type={subgroup.type}
						className="flex flex-row justify-between"
					>
						<div className="flex-1 flex flex-col space-y-2">
							<div className="flex flex-col space-y-1">
								<div className="flex items-center space-x-2">
									{subgroup.classroom && (
										<p className="font-semibold leading-none">
											{subgroup.classroom}
										</p>
									)}
									<p className="font-semibold leading-none">
										({subgroup.type})
									</p>
								</div>
								<p className="leading-none">{subgroup.subject}</p>
							</div>

							<p className="text-sm leading-none">
								{subgroup.number} пара ({subgroup.time})
							</p>
							<p className="text-xs leading-none">{subgroup.subgroupName}</p>
						</div>

						<ChevronRight />
					</Card>
				))}
			</div>
		);
	}

	return (
		<div className="min-w-full py-2 flex flex-col space-y-3">
			{lesson.map((subgroup, index) => (
				<Card
					onClick={() => onClick(subgroup)}
					key={`${subgroup.number}-${index}`}
					type={subgroup.type}
					className="flex flex-row justify-between"
				>
					<div className="flex-1 flex flex-col space-y-2">
						<div className="flex flex-col space-y-1">
							<div className="flex items-center space-x-2">
								{subgroup.classroom && (
									<p className="font-semibold leading-none">
										{subgroup.classroom}
									</p>
								)}
								<p className="font-semibold leading-none">({subgroup.type})</p>
							</div>

							<div className="flex flex-col space-y-1">
								<p className="leading-none">{subgroup.subject}</p>
								{subgroup.lecturer && (
									<p className="text-xs text-muted-foreground leading-none">
										{subgroup.lecturer}
									</p>
								)}
							</div>
						</div>

						<p className="text-sm leading-none">
							{subgroup.number} пара ({subgroup.time})
						</p>
						<p className="text-xs leading-none">{subgroup.subgroupName}</p>
					</div>

					<ChevronRight />
				</Card>
			))}
		</div>
	);
};

export default TimetableLessonCard;
