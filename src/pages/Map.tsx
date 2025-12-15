import { floor3 } from "@/assets";
import Header from "@/components/Header";
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
import Wrapper from "@/components/Wrapper";
import { floors, type FloorClassroom } from "@/lib/constants";
import { useClassroom } from "@/services/classroom/query/use-classroom";
import { MapPin, Minus, Navigation, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

const Map = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [selectedClassroom, setSelectedClassroom] =
		useState<FloorClassroom | null>(null);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const { data: classroom, isLoading: isClassroomLoading } = useClassroom(
		selectedClassroom?.title
	);

	useEffect(() => {
		const classroom = searchParams.get("classroom");
		const classroomOption = floors.third.find(
			(option) => option.title === classroom
		);

		if (classroom && classroomOption) {
			setSelectedClassroom(classroomOption);
		}
	}, [searchParams]);

	useEffect(() => {
		if (selectedClassroom) {
			setIsDrawerOpen(true);
		}
	}, [selectedClassroom]);

	return (
		<Wrapper>
			<Header title="Карта" onClickLeft={() => navigate(-1)} />
			<Layout className="p-0">
				<TransformWrapper
					initialScale={1}
					minScale={0.5}
					maxScale={3}
					wheel={{ step: 0.1 }}
					limitToBounds={false}
					centerOnInit={false}
				>
					{({ zoomIn, zoomOut, resetTransform }) => (
						<>
							<div className="absolute top-1/2 right-4 -translate-y-1/2 z-10 flex flex-col space-y-2">
								<Button onClick={() => zoomIn()}>
									<Plus className="stroke-3" />
								</Button>
								<Button onClick={() => zoomOut()}>
									<Minus className="stroke-3" />
								</Button>
								<Button onClick={() => resetTransform()}>
									<Navigation className="stroke-3" />
								</Button>
							</div>
							<TransformComponent>
								<div className="relative">
									<img src={floor3} alt="floor-3" />

									<svg className="absolute top-0 left-0 w-full h-full">
										{floors.third.map((classroom) => (
											<polygon
												key={classroom.title}
												fill="transparent"
												points={classroom.coordinates
													.map((point) => point.join(","))
													.join(" ")}
												onClick={() => setSelectedClassroom(classroom)}
											/>
										))}

										{/* <MapPin x={200} y={2010} className="stroke-red-700 z-10" /> */}

										{selectedClassroom && (
											<MapPin
												key={`${selectedClassroom.pin.x}-${selectedClassroom.pin.y}`}
												x={selectedClassroom.pin.x}
												y={selectedClassroom.pin.y}
												className="stroke-red-700 z-10 animate-in fade-in slide-in-from-top-3 duration-150"
											/>
										)}

										{/* <polygon points="169,50 170,50 170,200 169,200" fill="transparent" strokeWidth={2} stroke="var(--button-primary)" strokeDasharray={6} className="animate-pulse"/> */}
									</svg>
								</div>
							</TransformComponent>
						</>
					)}
				</TransformWrapper>
			</Layout>

			<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
				<DrawerContent>
					{isClassroomLoading ? (
						<div className="flex flex-grow justify-center items-center">
							<Loader color="primary" />
						</div>
					) : (
						<>
							<DrawerHeader className="px-4 items-start">
								<DrawerTitle>{classroom?.title}</DrawerTitle>
								<DrawerDescription className="text-left">
									{classroom?.description}
								</DrawerDescription>
							</DrawerHeader>
							<DrawerFooter>
								<DrawerClose>
									<Button block>В путь</Button>
								</DrawerClose>
							</DrawerFooter>
						</>
					)}
				</DrawerContent>
			</Drawer>
		</Wrapper>
	);
};

export default Map;
