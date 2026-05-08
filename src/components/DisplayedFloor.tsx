import { Floor } from "@/services/classroom/types";
import type { PropsWithChildren, Ref } from "react";
import { lazy, Suspense } from "react";

const Floor1SVG = lazy(() => import("@/assets/floor-1.svg?react"));
const Floor2SVG = lazy(() => import("@/assets/floor-2.svg?react"));
const Floor3SVG = lazy(() => import("@/assets/floor-3.svg?react"));
const Floor4SVG = lazy(() => import("@/assets/floor-4.svg?react"));
const Floor5SVG = lazy(() => import("@/assets/floor-5.svg?react"));
const Floor6SVG = lazy(() => import("@/assets/floor-6.svg?react"));
const Floor7SVG = lazy(() => import("@/assets/floor-7.svg?react"));

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

const FloorComponent = ({
  floor,
  ref,
}: {
  floor: Floor;
  ref: Ref<SVGSVGElement>;
}) => {
  if (floor === Floor.seventh) return <Floor7SVG ref={ref} />;
  if (floor === Floor.sixth) return <Floor6SVG ref={ref} />;
  if (floor === Floor.fifth) return <Floor5SVG ref={ref} />;
  if (floor === Floor.fourth) return <Floor4SVG ref={ref} />;
  if (floor === Floor.third) return <Floor3SVG ref={ref} />;
  if (floor === Floor.second) return <Floor2SVG ref={ref} />;
  return <Floor1SVG ref={ref} />;
};

const DisplayedFloor = ({ floor, ref, onClick, children }: Props) => {
  return (
    <svg
      className="h-full w-full select-none"
      viewBox={viewBoxes[floor]}
      preserveAspectRatio="xMidYMid meet"
      onClick={onClick}
    >
      <Suspense fallback={null}>
        <FloorComponent floor={floor} ref={ref} />
      </Suspense>
      {children}
    </svg>
  );
};

export default DisplayedFloor;
