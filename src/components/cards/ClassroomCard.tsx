import { Card } from "@/components/ui/card";
import type { Classroom } from "@/services/classroom/types";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  classroom: Classroom;
};

const ClassroomCard = ({ classroom }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({
      pathname: "/map",
      search: `?floor=${classroom.floor}&classroom=${classroom.id}`,
    });
  };

  return (
    <Card onClick={handleClick} className="gap-2">
      <div className="flex items-center justify-between">
        <h4 className="border-button-primary text-button-primary w-fit rounded-md border-1 px-1.5 py-1 leading-none font-semibold">
          {classroom.title}
        </h4>
        <ChevronRight className="size-5" />
      </div>
      <p className="text-sm leading-4.5">{classroom.description}</p>
    </Card>
  );
};

export default ClassroomCard;
