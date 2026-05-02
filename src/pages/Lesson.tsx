import Bottom from "@/components/Bottom";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/Wrapper";
import { useClassroom } from "@/services/classroom/query/use-classroom";
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
  const { data: classroom, isPending } = useClassroom(subgroup.classroom);

  if (isPending) {
    return (
      <Wrapper>
        <Header title="Пара" onClickLeft={() => navigate(-1)} />
        <Layout>
          <div className="flex grow items-center justify-center">
            <Loader color="primary" />
          </div>
        </Layout>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header title="Пара" onClickLeft={() => navigate(-1)} />
      <Layout>
        <div className="flex grow flex-col space-y-8">
          <h3 className="text-xl leading-5 font-semibold text-wrap">
            {subgroup.subject}
          </h3>

          <div className="flex flex-col space-y-5">
            {classroom && (
              <div className="flex flex-col space-y-2">
                <h4 className="leading-none font-medium">
                  Аудитория {classroom.title}
                </h4>
                <p className="text-sm leading-none">{classroom.description}</p>
              </div>
            )}

            {subgroup.lecturer && (
              <div className="flex flex-col space-y-2">
                <h4 className="leading-none font-medium">Преподаватель</h4>
                <p className="text-sm leading-none">{subgroup.lecturer}</p>
              </div>
            )}

            <div className="flex flex-col space-y-2">
              <h4 className="leading-none font-medium">Вид занятия</h4>
              <p className="text-sm leading-none">
                {lessonTypeLabel[subgroup.type]}
              </p>
            </div>

            <div className="flex flex-col space-y-2">
              <h4 className="leading-none font-medium">Группа</h4>
              <p className="text-sm leading-none">{subgroup.subgroupName}</p>
            </div>

            <div className="flex flex-col space-y-2">
              <h4 className="leading-none font-medium">Время</h4>
              <p className="text-sm leading-none">
                {subgroup.number} пара ({subgroup.time})
              </p>
            </div>
          </div>
        </div>

        {subgroup.classroom !== null && classroom && (
          <Bottom>
            <Button
              onClick={() =>
                navigate({
                  pathname: "/map",
                  search: `?floor=${classroom.floor}&classroom=${classroom.id}`,
                })
              }
              block
            >
              Показать на карте <MapPin />
            </Button>
          </Bottom>
        )}
      </Layout>
    </Wrapper>
  );
};

export default Lesson;
