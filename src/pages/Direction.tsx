import DisplayedFloor from "@/components/DisplayedFloor";
import Header from "@/components/Header";
import Pin from "@/components/icons/Pin";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import Wrapper from "@/components/Wrapper";
import { Floor } from "@/services/classroom/types";
import { useDirection } from "@/services/direction/query/use-direction";
import type { DirectionNode } from "@/services/direction/types";
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
	const [path, setPath] = useState<string[]>([]);
	const [selectedFloor, setSelectedFloor] = useState<Floor>(Floor.first);
	const svgRef = useRef<SVGSVGElement>(null);
	const { data: direction, isPending: isDirectionPending } =
		useDirection(locations);
	const [isDirectionDrawerOpen, setIsDirectionDrawerOpen] = useState(false);

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
			setOrigin(direction.origin);
			setDestination(direction.destination);
			setPath(direction.path);
		}
	}, [direction]);

	if (isDirectionPending) {
		return (
			<Wrapper>
				<Header title="Маршрут" onClickLeft={() => navigate(-1)} />
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
			<Header title="Маршрут" onClickLeft={() => navigate(-1)} />
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
								<DisplayedFloor floor={selectedFloor} ref={svgRef}>
									{origin && (
										<Pin
											x={origin.latitude - 5}
											y={origin.longitude - 10}
											key={origin.title}
											size={40}
											className="fill-red-700 stroke-red-900 stroke-1 z-10 animate-in fade-in slide-in-from-top-3 duration-150"
										/>
									)}
									{destination && (
										<Pin
											x={destination.latitude - 5}
											y={destination.longitude - 10}
											key={destination.title}
											size={40}
											className="fill-red-700 stroke-red-900 stroke-1 z-10 animate-in fade-in slide-in-from-top-3 duration-150"
										/>
									)}
									{path.map((node) => (
										<polyline
											key={node}
											points={node}
											strokeDasharray="10"
											className="stroke-red-700 fill-none stroke-3 animate-pulse"
										/>
									))}
								</DisplayedFloor>
							</TransformComponent>
						</>
					)}
				</TransformWrapper>
			</Layout>

			<Drawer
				open={isDirectionDrawerOpen}
				onOpenChange={setIsDirectionDrawerOpen}
			>
				<DrawerContent>
					<DrawerHeader className="px-4 items-start">
						<DrawerTitle></DrawerTitle>
						<DrawerDescription className="text-left"></DrawerDescription>
					</DrawerHeader>
				</DrawerContent>
			</Drawer>
		</Wrapper>
	);
};

export default Direction;
