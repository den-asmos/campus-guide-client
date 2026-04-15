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
      <div className="flex min-w-full flex-col space-y-3 py-2">
        {lesson.map((subgroup, index) => (
          <Card
            onClick={() => onClick(subgroup)}
            key={`${subgroup.number}-${index}`}
            type={subgroup.type}
            className="flex flex-row justify-between"
          >
            <div className="flex flex-1 flex-col space-y-2">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  {subgroup.classroom && (
                    <p className="leading-none font-semibold">
                      {subgroup.classroom}
                    </p>
                  )}
                  <p className="leading-none font-semibold">
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
    <div className="flex min-w-full flex-col space-y-3 py-2">
      {lesson.map((subgroup, index) => (
        <Card
          onClick={() => onClick(subgroup)}
          key={`${subgroup.number}-${index}`}
          type={subgroup.type}
          className="flex flex-row justify-between"
        >
          <div className="flex flex-1 flex-col space-y-2">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                {subgroup.classroom && (
                  <p className="leading-none font-semibold">
                    {subgroup.classroom}
                  </p>
                )}
                <p className="leading-none font-semibold">({subgroup.type})</p>
              </div>

              <div className="flex flex-col space-y-1">
                <p className="leading-none">{subgroup.subject}</p>
                {subgroup.lecturer && (
                  <p className="text-muted-foreground text-xs leading-none">
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
