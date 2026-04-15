import Bottom from "@/components/Bottom";
import DisplayedFloor from "@/components/DisplayedFloor";
import Header from "@/components/Header";
import Hint from "@/components/Hint";
import Pin from "@/components/icons/Pin";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/Wrapper";
import { getLocationLabel } from "@/lib/utils";
import { Floor } from "@/services/classroom/types";
import { useDirection } from "@/services/direction/query/use-direction";
import type { DirectionNode, FloorGroup } from "@/services/direction/types";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

const Direction = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [locations, setLocations] = useState<{
    origin: string;
    destination: string;
  } | null>(null);
  const [origin, setOrigin] = useState<DirectionNode | null>(null);
  const [destination, setDestination] = useState<DirectionNode | null>(null);
  const [groups, setGroups] = useState<FloorGroup[]>([]);
  const [currentGroup, setCurrentGroup] = useState<{
    group: FloorGroup;
    index: number;
  } | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<Floor>(Floor.first);
  const svgRef = useRef<SVGSVGElement>(null);
  const { data: direction, isPending: isDirectionPending } =
    useDirection(locations);

  useEffect(() => {
    const searchOrigin = searchParams.get("origin");
    const searchDestination = searchParams.get("destination");
    const searchFloor = searchParams.get("floor");

    if (!searchOrigin || !searchDestination || !searchFloor) {
      navigate("/");
    } else {
      setLocations({
        origin: searchOrigin,
        destination: searchDestination,
      });
      setSelectedFloor(parseInt(searchFloor));
    }
  }, [navigate, searchParams]);

  useEffect(() => {
    if (direction) {
      setGroups(direction.groups);
      setCurrentGroup({ group: direction.groups[0], index: 0 });
      setOrigin(direction.groups[0].origin);
      setDestination(direction.groups[0].destination);
      setSelectedFloor(direction.groups[0].origin.floor);
    }
  }, [direction]);

  const hasNextGroup = () => {
    return (
      currentGroup?.index !== undefined &&
      currentGroup.index < groups.length - 1
    );
  };

  const setNextGroup = () => {
    if (!hasNextGroup() || !currentGroup) {
      return;
    }

    const index = currentGroup.index + 1;
    const group = groups[index];

    setCurrentGroup({ group, index });
    setOrigin(group.origin);
    setDestination(group.destination);
    setSelectedFloor(group.origin.floor);
  };

  if (isDirectionPending) {
    return (
      <Wrapper>
        <Header title="Маршрут" onClickLeft={() => navigate(-1)} />
        <Layout>
          <div className="flex flex-grow items-center justify-center">
            <Loader color="primary" />
          </div>
        </Layout>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="h-screen">
      <Header title="Маршрут" onClickLeft={() => navigate(-1)} />
      <Layout className="relative overflow-hidden p-0">
        {origin && destination && (
          <div className="absolute top-4 z-10 w-full px-4">
            <Hint className="text-center">
              {getLocationLabel(origin)} &#8594; {getLocationLabel(destination)}
            </Hint>
          </div>
        )}

        <TransformWrapper
          initialScale={2}
          minScale={1}
          maxScale={5}
          wheel={{ step: 0.4 }}
          smooth={true}
          limitToBounds={false}
          centerOnInit={true}
          key={selectedFloor}
        >
          {() => (
            <>
              <div className="fixed top-1/2 right-0 z-20 flex -translate-y-1/2 flex-col space-y-3 rounded-sm bg-white/70 p-2">
                {Object.values(Floor)
                  .filter((floor) => typeof floor === "number")
                  .map((floor) => (
                    <Button
                      key={floor}
                      variant={selectedFloor === floor ? "outline" : "default"}
                    >
                      {floor}
                    </Button>
                  ))}
              </div>
              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  height: "100%",
                }}
                contentStyle={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <DisplayedFloor floor={selectedFloor} ref={svgRef}>
                  {origin && (
                    <Pin
                      x={origin.latitude - 15}
                      y={origin.longitude - 10}
                      key={origin.title}
                      size={40}
                      className="animate-in fade-in slide-in-from-top-3 z-10 fill-red-700 stroke-red-900 stroke-1 duration-150"
                    />
                  )}
                  {destination && (
                    <Pin
                      x={destination.latitude - 15}
                      y={destination.longitude - 10}
                      key={destination.title}
                      size={40}
                      className="animate-in fade-in slide-in-from-top-3 z-10 fill-red-700 stroke-red-900 stroke-1 duration-150"
                    />
                  )}

                  {currentGroup?.group.path && (
                    <polyline
                      key={currentGroup.group.path}
                      points={currentGroup.group.path}
                      className="animate-pulse fill-none stroke-red-700 stroke-4"
                    />
                  )}
                </DisplayedFloor>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>

        {hasNextGroup() && (
          <Bottom className="px-4">
            <Button block onClick={setNextGroup}>
              Дальше
            </Button>
          </Bottom>
        )}
      </Layout>
    </Wrapper>
  );
};

export default Direction;
