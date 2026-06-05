import DisplayedFloor from "@/components/DisplayedFloor";
import Header from "@/components/Header";
import Hint from "@/components/Hint";
import Pin from "@/components/icons/Pin";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { inputVariants } from "@/components/ui/variants";
import Wrapper from "@/components/Wrapper";
import { cn, findClassroom, getInitialTransform } from "@/lib/utils";
import { useFloorClassrooms } from "@/services/classroom/query/use-classroom";
import { Floor, type Classroom } from "@/services/classroom/types";
import { ArrowDownUp, ChevronLeft, MapPin, RouteIcon } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  TransformComponent,
  TransformWrapper,
  type ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { toast } from "sonner";
import { INITIAL_SCALE } from "@/lib/constants";

type MapPin = {
  x: number;
  y: number;
  classroomId: string;
};

type SelectionMode = "destination" | "origin" | null;

const Map = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedLocation, setSelectedLocation] = useState<Classroom | null>(
    null,
  );
  const [selectedFloor, setSelectedFloor] = useState<Floor>(Floor.third);
  const [origin, setOrigin] = useState<Classroom | null>(null);
  const [destination, setDestination] = useState<Classroom | null>(null);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>(null);
  const [pin, setPin] = useState<MapPin | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const transformRef = useRef<ReactZoomPanPinchRef>(null);
  const selectedFloorRef = useRef(selectedFloor);
  selectedFloorRef.current = selectedFloor;
  const [pendingCenter, setPendingCenter] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isLocationDrawerOpen, setIsLocationDrawerOpen] = useState(false);
  const [isDirectionDrawerOpen, setIsDirectionDrawerOpen] = useState(false);
  const { data: floorClassrooms, isLoading: isFloorClassroomsLoading } =
    useFloorClassrooms(selectedFloor);
  const isManualFloorOverride = useRef(false);

  const handleMapClick = useCallback(
    (event: React.MouseEvent<SVGSVGElement>) => {
      event.stopPropagation();

      const target = event.target as SVGElement;
      const location = findClosestLocation(target);

      if (location) {
        if (!svgRef.current || !floorClassrooms) {
          return;
        }

        const rect = location.querySelector("rect");
        if (!rect) {
          return;
        }
        const classroom = findClassroom(location.id, floorClassrooms);
        if (!classroom) {
          return;
        }

        setSelectedLocation(classroom);
        setPin({
          x: classroom.latitude,
          y: classroom.longitude,
          classroomId: target.id,
        });
      }
    },
    [floorClassrooms],
  );

  const findClosestLocation = (element: Element | null) => {
    while (element && element !== svgRef.current) {
      if (element.id.startsWith("location-id-")) {
        return element;
      }
      element = element.parentElement;
    }

    return null;
  };

  const handleStartSelection = () => {
    if (!selectedLocation) {
      return;
    }
    setDestination(selectedLocation);
    setIsLocationDrawerOpen(false);
    setIsDirectionDrawerOpen(true);
  };

  const handleStartSelectionAsOrigin = () => {
    if (!selectedLocation) {
      return;
    }
    setOrigin(selectedLocation);
    setIsLocationDrawerOpen(false);
    setIsDirectionDrawerOpen(true);
  };

  const handleRepickOrigin = () => {
    setOrigin(null);
    setSelectedLocation(null);
    setPin(null);
    setIsDirectionDrawerOpen(false);
    setSelectionMode("origin");
  };

  const handleRepickDestination = () => {
    setDestination(null);
    setSelectedLocation(null);
    setPin(null);
    setIsDirectionDrawerOpen(false);
    setSelectionMode("destination");
  };

  const handleConfirmSelection = () => {
    if (!selectedLocation) {
      return;
    }
    if (selectionMode === "origin") {
      setOrigin(selectedLocation);
    }
    if (selectionMode === "destination") {
      setDestination(selectedLocation);
    }
    setSelectionMode(null);
    setIsDirectionDrawerOpen(true);
  };

  const handleSwitchDirections = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleConfirmDirection = async () => {
    if (!origin || !destination) {
      toast.error("Не выбрана точка отправления или назначения");
      return;
    }
    setIsDirectionDrawerOpen(false);
    navigate({
      pathname: "/direction",
      search: `?origin=${origin.id}&destination=${destination.id}&floor=${origin.floor}`,
    });
  };

  const handleResetDirection = () => {
    setOrigin(null);
    setDestination(null);
    setSelectionMode(null);
    setIsDirectionDrawerOpen(false);
  };

  useEffect(() => {
    const classroomId = searchParams.get("classroom");
    if (!classroomId) {
      isManualFloorOverride.current = false;
      setPin(null);
      setSelectedLocation(null);
      return;
    }

    if (isManualFloorOverride.current) {
      return;
    }

    const floor = searchParams.get("floor");
    const parsedFloor = floor ? (parseInt(floor) as Floor) : null;
    if (parsedFloor) {
      setSelectedFloor(parsedFloor);
    }

    const classroom = findClassroom(
      `location-id-${classroomId}`,
      floorClassrooms,
    );
    if (classroom) {
      setSelectedLocation(classroom);
      setPin({
        x: classroom.latitude,
        y: classroom.longitude,
        classroomId: classroom.title,
      });
      setPendingCenter({ x: classroom.latitude, y: classroom.longitude });
    }
  }, [searchParams, floorClassrooms]);

  useEffect(() => {
    if (!pendingCenter) {
      return;
    }
    const wrapper = transformRef.current?.instance.wrapperComponent;
    if (!wrapper) {
      return;
    }

    const [x, y] = getInitialTransform(
      wrapper,
      selectedFloor,
      pendingCenter.x,
      pendingCenter.y,
    );
    transformRef.current!.setTransform(x, y, INITIAL_SCALE, 0);
    setPendingCenter(null);
  }, [pendingCenter, selectedFloor]);

  useEffect(() => {
    setIsLocationDrawerOpen(!!selectedLocation);
  }, [selectedLocation]);

  const handleMapInit = useCallback(
    (ref: ReactZoomPanPinchRef) => {
      const wrapper = ref.instance.wrapperComponent;
      if (!wrapper) {
        return;
      }
      const { clientWidth, clientHeight } = wrapper;
      if (!clientWidth || !clientHeight) {
        return;
      }

      const target = pendingCenter;
      const [x, y] = getInitialTransform(
        wrapper,
        selectedFloor,
        target?.x,
        target?.y,
      );
      ref.setTransform(x, y, INITIAL_SCALE, 0);
    },
    [selectedFloor, pendingCenter],
  );

  const removePin = () => {
    setPin(null);
    setSelectedLocation(null);
    setSearchParams({}, { replace: true });
  };

  if (isFloorClassroomsLoading) {
    return (
      <Wrapper>
        <Header
          title="Карта"
          leftIcon={<ChevronLeft />}
          onClickLeft={() => navigate(-1)}
        />
        <Layout>
          <div className="flex grow items-center justify-center">
            <Loader color="primary" />
          </div>
        </Layout>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="h-screen">
      <Header
        title="Карта"
        leftIcon={<ChevronLeft />}
        onClickLeft={() => navigate(-1)}
      />
      <Layout className="relative overflow-hidden p-0">
        {selectionMode && (
          <div className="absolute top-6 z-10 w-full px-6">
            <Hint className="text-center">
              {selectionMode === "origin"
                ? "Выберите точку отправления"
                : "Выберите точку назначения"}
            </Hint>
          </div>
        )}

        <TransformWrapper
          ref={transformRef}
          initialScale={INITIAL_SCALE}
          minScale={1}
          maxScale={5}
          wheel={{ step: 0.4 }}
          smooth={true}
          limitToBounds={false}
          key={selectedFloor}
          onInit={handleMapInit}
        >
          {() => (
            <>
              <div className="fixed top-1/2 right-0 z-20 flex -translate-y-1/2 flex-col space-y-3 rounded-sm bg-white/70 px-6 py-2">
                {Object.values(Floor)
                  .filter((floor) => typeof floor === "number")
                  .map((floor) => (
                    <Button
                      key={floor}
                      variant={selectedFloor === floor ? "outline" : "default"}
                      onClick={() => {
                        isManualFloorOverride.current = true;
                        setSelectedFloor(floor);
                        removePin();
                      }}
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
                <DisplayedFloor
                  floor={selectedFloor}
                  ref={svgRef}
                  onClick={handleMapClick}
                >
                  {pin && (
                    <Pin
                      onClick={(event) => {
                        event.stopPropagation();
                        removePin();
                      }}
                      x={pin.x}
                      y={pin.y}
                      key={`${pin.x}-${pin.y}`}
                      size={40}
                      className="animate-in fade-in slide-in-from-top-3 z-10 fill-red-700 stroke-red-900 stroke-1 duration-150"
                    />
                  )}
                </DisplayedFloor>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </Layout>

      <Drawer
        open={isLocationDrawerOpen}
        onOpenChange={setIsLocationDrawerOpen}
      >
        <DrawerContent>
          <DrawerHeader className="items-start px-6">
            <DrawerTitle>{selectedLocation?.title}</DrawerTitle>
            <DrawerDescription className="text-left">
              {selectedLocation?.description}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              {selectionMode ? (
                <Button onClick={handleConfirmSelection} block>
                  {selectionMode === "origin" ? "Я здесь" : "Сюда"}
                </Button>
              ) : origin ? (
                <Button onClick={handleStartSelection} block>
                  Сюда
                </Button>
              ) : destination ? (
                <Button onClick={handleStartSelectionAsOrigin} block>
                  Я здесь
                </Button>
              ) : (
                <Button onClick={handleStartSelection} block>
                  Маршрут <RouteIcon />
                </Button>
              )}
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer open={isDirectionDrawerOpen}>
        <DrawerContent>
          <DrawerHeader className="items-start px-6">
            <DrawerTitle>Маршрут</DrawerTitle>
            <DrawerDescription className="text-left">
              Для построения маршрута выберите точки отправления и назначения
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col items-center space-y-2 px-6 py-2">
            <p
              onClick={handleRepickOrigin}
              className={cn(
                inputVariants(),
                !origin?.title && "text-muted-foreground",
              )}
            >
              {origin?.title || "Точка отправления"}
            </p>
            <ArrowDownUp
              onClick={handleSwitchDirections}
              className="stroke-button-primary"
            />
            <p
              onClick={handleRepickDestination}
              className={cn(
                inputVariants(),
                !destination?.title && "text-muted-foreground",
              )}
            >
              {destination?.title || "Точка назначения"}
            </p>
          </div>
          <DrawerFooter>
            <Button
              disabled={!origin || !destination}
              onClick={handleConfirmDirection}
              block
            >
              В путь
            </Button>

            <Button variant="outline" onClick={handleResetDirection} block>
              Отмена
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Wrapper>
  );
};

export default Map;
