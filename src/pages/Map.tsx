import DisplayedFloor from "@/components/DisplayedFloor";
import Header from "@/components/Header";
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
import { cn, findClassroom } from "@/lib/utils";
import { useFloorClassrooms } from "@/services/classroom/query/use-classroom";
import { Floor, type Classroom } from "@/services/classroom/types";
import { ArrowDownUp, MapPin, RouteIcon } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { toast } from "sonner";

type MapPin = {
	x: number;
	y: number;
	classroomId: string;
};

const Map = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [selectedLocation, setSelectedLocation] = useState<Classroom | null>(
		null,
	);
	const [selectedFloor, setSelectedFloor] = useState<Floor>(Floor.third);
	const [origin, setOrigin] = useState<Classroom | null>(null);
	const [destination, setDestination] = useState<Classroom | null>(null);
	const [pin, setPin] = useState<MapPin | null>(null);
	const svgRef = useRef<SVGSVGElement>(null);
	const [isLocationDrawerOpen, setIsLocationDrawerOpen] = useState(false);
	const [isDirectionDrawerOpen, setIsDirectionDrawerOpen] = useState(false);
	const { data: floorClassrooms, isLoading: isFloorClassroomsLoading } =
		useFloorClassrooms(selectedFloor);

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

				const x = rect.x.baseVal.value + rect.width.baseVal.value / 2 - 15;
				const y = rect.y.baseVal.value + rect.height.baseVal.value / 2 - 15;
				console.log(location.id, x, y);

				const classroom = findClassroom(location.id, floorClassrooms);

				if (!classroom) {
					return;
				}

				setSelectedLocation(classroom);
				setPin({
					x: classroom.latitude,
					y: classroom.longitude,
					// x,
					// y,
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
		setIsDirectionDrawerOpen(true);
	};

	const handleSelectOrigin = () => {
		setSelectedLocation(null);
		setPin(null);
		setOrigin(null);
		setIsDirectionDrawerOpen(false);
	};

	const handleConfirmOrigin = () => {
		if (!selectedLocation) {
			return;
		}
		setOrigin(selectedLocation);
		setIsDirectionDrawerOpen(true);
	};

	const handleSelectDestination = () => {
		setSelectedLocation(null);
		setPin(null);
		setDestination(null);
		setIsDirectionDrawerOpen(false);
	};

	const handleConfirmDestination = () => {
		if (!selectedLocation) {
			return;
		}
		setDestination(selectedLocation);
		setIsDirectionDrawerOpen(true);
	};

	const handleSwitchDirections = () => {
		setOrigin(destination);
		setDestination(origin);
	};

	const handleConfirmDirection = async () => {
		if (!origin || !destination) {
			toast.error("Не выбрана точка отправления или назначения");
		} else {
			navigate({
				pathname: "/direction",
				search: `?origin=${origin.id}&destination=${destination.id}&floor=${origin.floor}`,
			});
		}
		setIsDirectionDrawerOpen(false);
	};

	const handleResetDirection = () => {
		setOrigin(null);
		setDestination(null);
		setIsDirectionDrawerOpen(false);
	};

	useEffect(() => {
		const classroomId = searchParams.get("classroom");
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
		}
	}, [searchParams, floorClassrooms]);

	useEffect(() => {
		if (selectedLocation) {
			setIsLocationDrawerOpen(true);
		}
	}, [selectedLocation]);

	const removePin = () => {
		setPin(null);
	};

	if (isFloorClassroomsLoading) {
		return (
			<Wrapper>
				<Header title="Карта" onClickLeft={() => navigate(-1)} />
				<Layout>
					<div className="flex flex-grow justify-center items-center">
						<Loader color="primary" />
					</div>
				</Layout>
			</Wrapper>
		);
	}

	return (
		<Wrapper className="h-screen">
			<Header title="Карта" onClickLeft={() => navigate(-1)} />
			<Layout className="p-0 relative overflow-hidden">
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
							<div className="p-2 fixed top-1/2 right-0 -translate-y-1/2 z-20 flex flex-col space-y-3 rounded-sm bg-white/70">
								{Object.values(Floor)
									.filter((floor) => typeof floor === "number")
									.map((floor) => (
										<Button
											key={floor}
											variant={selectedFloor === floor ? "outline" : "default"}
											onClick={() => {
												setSelectedFloor(floor);
												setPin(null);
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
											className="fill-red-700 stroke-red-900 stroke-1 z-10 animate-in fade-in slide-in-from-top-3 duration-150"
										/>
									)}
									{/* <Pin
										onClick={(event) => {
											event.stopPropagation();
											removePin();
										}}
										x={760}
										y={766}
										key={`test`}
										size={40}
										className="fill-red-700 stroke-red-900 stroke-1 z-10 animate-in fade-in slide-in-from-top-3 duration-150"
									/> */}
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
					<DrawerHeader className="px-4 items-start">
						<DrawerTitle>{selectedLocation?.title}</DrawerTitle>
						<DrawerDescription className="text-left">
							{selectedLocation?.description}
						</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter>
						<DrawerClose asChild>
							{origin ? (
								<Button onClick={handleConfirmDestination} block>
									Сюда
								</Button>
							) : destination ? (
								<Button onClick={handleConfirmOrigin} block>
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
					<DrawerHeader className="px-4 items-start">
						<DrawerTitle>Маршрут</DrawerTitle>
						<DrawerDescription>
							Для построения маршрута выберите точки отправления и назначения
						</DrawerDescription>
					</DrawerHeader>
					<div className="px-4 py-2 flex flex-col items-center space-y-2">
						<p
							onClick={handleSelectOrigin}
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
							onClick={handleSelectDestination}
							className={cn(
								inputVariants(),
								!destination?.title && "text-muted-foreground",
							)}
						>
							{destination?.title || "Точка назначения"}
						</p>
					</div>
					<DrawerFooter>
						<DrawerClose asChild>
							<Button
								disabled={!origin || !destination}
								onClick={handleConfirmDirection}
								block
							>
								В путь
							</Button>
						</DrawerClose>
						<DrawerClose asChild>
							<Button variant="outline" onClick={handleResetDirection} block>
								Отмена
							</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Wrapper>
	);
};

export default Map;
