import TimetableLessonCard from "@/components/cards/TimetableLessonCard";
import Header from "@/components/Header";
import Hint from "@/components/Hint";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import Wrapper from "@/components/Wrapper";
import { useGreeting } from "@/hooks/useGreeting";
import { useTimetable } from "@/hooks/useTimetable";
import { mapTimetableDay } from "@/lib/mappers";
import { currentDate, currentWeek, isLessonInFuture } from "@/lib/time";
import { useCurrentUser } from "@/services/auth/query/use-auth";
import { Role } from "@/services/user/types";
import { Calendar, Menu, Settings } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
	const navigate = useNavigate();
	const {
		data: user,
		isPending: isUserPending,
		error: userError,
	} = useCurrentUser();
	const {
		data: timetable,
		isLoading: isTimetableLoading,
		isFetched: isTimetableFetched,
		error: timetableError,
	} = useTimetable(user);
	const { userLabel, dayTimeGreeting } = useGreeting(user);

	useEffect(() => {
		if (userError) {
			console.error(userError);
			toast.error("Ошибка получения данных о пользователе");
		}

		if (timetableError) {
			console.error(timetableError);
			toast.error("Ошибка получения расписания");
		}
	}, [userError, timetableError]);

	const timetableDay = useMemo(() => {
		if (!timetable) {
			return [];
		}

		return mapTimetableDay(currentDate(), timetable)
			.map((lesson) =>
				lesson.filter((subgroup) => isLessonInFuture(subgroup.time))
			)
			.filter((lesson) => lesson.length > 0);
	}, [timetable]);

	if (isUserPending || isTimetableLoading) {
		return (
			<Wrapper>
				<Header
					leftIcon={<Menu />}
					onClickLeft={() => {}}
					rightIcon={<UserAvatar />}
					onClickRight={() => navigate("/profile")}
				/>
				<Layout>
					<div className="flex flex-grow justify-center items-center">
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
				leftIcon={<Settings />}
				onClickLeft={() => navigate("/settings")}
				rightIcon={
					<UserAvatar
						avatar={user.avatar}
						firstName={user.firstName}
						lastName={user.lastName}
					/>
				}
				onClickRight={() => navigate("/profile")}
			/>
			<Layout>
				<div className="flex flex-col flex-grow justify-around">
					<div className="flex flex-col flex-grow justify-center space-y-6">
						<div>
							<p className="text-base">{dayTimeGreeting},</p>
							<h4 className="text-xl font-semibold">{userLabel}</h4>
						</div>

						<div className="flex flex-col space-y-4">
							<div className="flex items-end space-x-2">
								<Calendar />
								<p className="leading-none">{currentWeek()}</p>
							</div>
							<Link to="/timetable">
								<Button>Расписание</Button>
							</Link>
						</div>
					</div>

					<div className="flex flex-col flex-grow space-y-4">
						<h3 className="text-xl font-semibold">Предстоящие пары</h3>
						<div className="flex space-x-4 overflow-x-scroll">
							{isTimetableFetched &&
								timetableDay.length > 0 &&
								timetableDay.map((lesson, index) => (
									<TimetableLessonCard key={index} lesson={lesson} />
								))}

							{isTimetableFetched && !timetableDay.length && (
								<Hint>Сегодня занятий больше не планируется</Hint>
							)}

							{(!user.faculty || !user.course || !user.group) &&
								user.role !== Role.lecturer && (
									<Hint>
										Для просмотра предстоящих пар заполните данные о факультет,
										курсе и группе в своём профиле
									</Hint>
								)}
						</div>
					</div>
				</div>
			</Layout>
			<Navbar />
		</Wrapper>
	);
};
export default Home;
