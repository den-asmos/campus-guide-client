import Bottom from "@/components/Bottom";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/Wrapper";
import {
	lessonTypeLabel,
	type TimetableLesson,
} from "@/services/timetable/types";
import { MapPin } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Lesson = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { subgroup } = location.state as {
		subgroup: TimetableLesson & { subgroupName: string };
	};

	return (
		<Wrapper>
			<Header
				title={subgroup.classroom || "Аудитория"}
				onClickLeft={() => navigate(-1)}
			/>
			<Layout>
				<div className="flex flex-col flex-grow space-y-8">
					<h3 className="text-xl font-semibold leading-5 text-wrap">
						{subgroup.subject}
					</h3>

					<div className="flex flex-col space-y-5">
						{subgroup.lecturer && (
							<div className="flex flex-col space-y-2">
								<h4 className="font-medium leading-none">Преподаватель</h4>
								<p className="text-sm leading-none">{subgroup.lecturer}</p>
							</div>
						)}

						<div className="flex flex-col space-y-2">
							<h4 className="font-medium leading-none">Вид занятия</h4>
							<p className="text-sm leading-none">
								{lessonTypeLabel[subgroup.type]}
							</p>
						</div>

						<div className="flex flex-col space-y-2">
							<h4 className="font-medium leading-none">Группа</h4>
							<p className="text-sm leading-none">{subgroup.subgroupName}</p>
						</div>

						<div className="flex flex-col space-y-2">
							<h4 className="font-medium leading-none">Время</h4>
							<p className="text-sm leading-none">
								{subgroup.number} пара ({subgroup.time})
							</p>
						</div>
					</div>
				</div>

				<Bottom>
					<Button
						onClick={() =>
							navigate({
								pathname: "/map",
								search: `?classroom=${subgroup.classroom}`,
							})
						}
						block
					>
						<MapPin /> Маршрут
					</Button>
				</Bottom>
			</Layout>
		</Wrapper>
	);
};

export default Lesson;
