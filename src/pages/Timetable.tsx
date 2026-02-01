import TimetableLessonCard from "@/components/cards/TimetableLessonCard";
import Header from "@/components/Header";
import Hint from "@/components/Hint";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import DrawerSelect from "@/components/ui/drawer-select";
import { Field } from "@/components/ui/field";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Wrapper from "@/components/Wrapper";
import { courseOptions, facultyOptions, groupOptions } from "@/lib/constants";
import { mapTimetableDay } from "@/lib/mappers";
import { currentWeekDates } from "@/lib/time";
import {
	filterCourseOptions,
	filterGroupOptions,
	findByValue,
} from "@/lib/utils";
import {
	type TimetableFormSchema,
	formSchema,
} from "@/schemas/timetableFormSchema";
import { useCurrentUser } from "@/services/auth/query/use-auth";
import { useGroupTimetable } from "@/services/timetable/query/use-timetable";
import { mapTimetableRequest } from "@/services/timetable/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const defaultValues = {
	faculty: undefined,
	course: undefined,
	group: undefined,
};

const Timetable = () => {
	const navigate = useNavigate();
	const {
		data: user,
		isPending: isUserPending,
		error: userError,
	} = useCurrentUser();
	const [currentWeek] = useState(currentWeekDates().dates);
	const [selectedDay, setSelectedDay] = useState(
		currentWeekDates().currentDate,
	);

	const form = useForm<TimetableFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const values = form.watch();

	const {
		data: timetable,
		isLoading: isTimetableLoading,
		isFetched: isTimetableFetched,
		error: timetableError,
	} = useGroupTimetable(mapTimetableRequest(values));

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

		return mapTimetableDay(selectedDay, timetable);
	}, [selectedDay, timetable]);

	const onSubmit = form.handleSubmit((values) => {
		console.log(values);
	});

	useEffect(() => {
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
	}, [user, form]);

	if (isUserPending) {
		<Wrapper>
			<Header title="Расписание" onClickLeft={() => navigate(-1)} />
			<Layout>
				<div className="flex flex-grow justify-center items-center">
					<Loader color="primary" />
				</div>
			</Layout>
		</Wrapper>;
	}

	return (
		<Wrapper>
			<Header title="Расписание" onClickLeft={() => navigate(-1)} />
			<Layout>
				<div className="flex flex-col flex-grow space-y-6">
					<form onSubmit={onSubmit} className="flex flex-col space-y-4">
						<div className="grid grid-cols-3 items-center gap-2">
							<Controller
								name="faculty"
								control={form.control}
								render={({ field }) => (
									<Field>
										<DrawerSelect
											placeholder="Факультет"
											options={facultyOptions}
											selectedOption={form.getValues("faculty")}
											onChange={(value) => {
												form.resetField("course");
												form.resetField("group");
												field.onChange(value);
											}}
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
										<DrawerSelect
											placeholder="Курс"
											options={filterCourseOptions(values.faculty?.value)}
											selectedOption={form.getValues("course")}
											onChange={(value) => {
												form.resetField("group");
												field.onChange(value);
											}}
											disabled={!values.faculty}
											displayedProperty="value"
										/>
									</Field>
								)}
							/>

							<Controller
								name="group"
								control={form.control}
								render={({ field }) => (
									<Field>
										<DrawerSelect
											placeholder="Группа"
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
						</div>

						<Tabs defaultValue={selectedDay}>
							<TabsList>
								{currentWeek.map((date) => (
									<TabsTrigger
										key={date.value}
										value={date.value}
										className="capitalize"
										onClick={() => setSelectedDay(date.value)}
									>
										{date.label}
									</TabsTrigger>
								))}
							</TabsList>
						</Tabs>
					</form>

					{isTimetableLoading && (
						<div className="flex flex-col flex-grow justify-center items-center">
							<Loader color="primary" />
						</div>
					)}

					<div className="flex flex-col flex-grow space-y-4 overflow-y-scroll">
						{timetableDay.length > 0 &&
							timetableDay.map((lesson, index) => (
								<TimetableLessonCard key={index} lesson={lesson} variant="sm" />
							))}

						{timetableDay.length === 0 && isTimetableFetched && (
							<Hint className="text-center">
								В этот день у выбранной группы нет занятий
							</Hint>
						)}
					</div>
				</div>
			</Layout>
			<Navbar />
		</Wrapper>
	);
};

export default Timetable;
