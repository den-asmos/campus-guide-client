import Floor1SVG from "@/assets/floor-1.svg?react";
import Floor2SVG from "@/assets/floor-2.svg?react";
import Floor3SVG from "@/assets/floor-3.svg?react";
import Floor4SVG from "@/assets/floor-4.svg?react";
import Floor5SVG from "@/assets/floor-5.svg?react";
import Floor6SVG from "@/assets/floor-6.svg?react";
import Floor7SVG from "@/assets/floor-7.svg?react";
import { Floor } from "@/services/classroom/types";
import type { PropsWithChildren, Ref } from "react";

type Props = PropsWithChildren<{
  floor: Floor;
  ref: Ref<SVGSVGElement>;
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}>;

const viewBoxes: Record<Floor, string> = {
  1: "0 0 2664 4981",
  2: "0 0 2632 4287",
  3: "0 0 640 3406",
  4: "0 0 640 3491",
  5: "0 0 640 3524",
  6: "0 0 640 3546",
  7: "0 0 676 2415",
};

const DisplayedFloor = ({ floor, ref, onClick, children }: Props) => {
  return (
    <svg
      className="h-full w-full select-none"
      viewBox={viewBoxes[floor]}
      preserveAspectRatio="xMidYMid meet"
      onClick={onClick}
    >
      {floor === Floor.seventh ? (
        <Floor7SVG ref={ref} />
      ) : floor === Floor.sixth ? (
        <Floor6SVG ref={ref} />
      ) : floor === Floor.fifth ? (
        <Floor5SVG ref={ref} />
      ) : floor === Floor.fourth ? (
        <Floor4SVG ref={ref} />
      ) : floor === Floor.third ? (
        <Floor3SVG ref={ref} />
      ) : floor === Floor.second ? (
        <Floor2SVG ref={ref} />
      ) : (
        <Floor1SVG ref={ref} />
      )}
      {children}
    </svg>
  );
};

export default DisplayedFloor;
