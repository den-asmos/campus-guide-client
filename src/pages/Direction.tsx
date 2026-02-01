import Floor3SVG from "@/assets/floor-3.svg?react";
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
import { useDirection } from "@/services/direction/query/use-direction";
import type { DirectionNode } from "@/services/direction/types";
import { Minus, Plus } from "lucide-react";
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
	const [steps, setSteps] = useState<DirectionNode[]>([]);
	const svgRef = useRef<SVGSVGElement>(null);
	const { data: direction, isPending: isDirectionPending } =
		useDirection(locations);
	const [isDirectionDrawerOpen, setIsDirectionDrawerOpen] = useState(false);

	useEffect(() => {
		const searchOrigin = searchParams.get("origin");
		const searchDestination = searchParams.get("destination");

		if (!searchOrigin || !searchDestination) {
			navigate("/");
		} else {
			setLocations({
				origin: searchOrigin,
				destination: searchDestination,
			});
		}
	}, [navigate, searchParams]);

	useEffect(() => {
		if (direction) {
			setOrigin(direction.origin);
			setDestination(direction.destination);
			setSteps(direction.nodes);
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
		<Wrapper>
			<Header title="Маршрут" onClickLeft={() => navigate(-1)} />
			<Layout>
				<TransformWrapper
					initialScale={1}
					minScale={1}
					maxScale={3}
					wheel={{ step: 0.2 }}
					limitToBounds={false}
				>
					{({ zoomIn, zoomOut }) => (
						<>
							<div className="fixed top-1/2 right-4 -translate-y-1/2 z-20 flex flex-col space-y-2">
								<Button onClick={() => zoomIn()}>
									<Plus className="stroke-3" />
								</Button>
								<Button onClick={() => zoomOut()}>
									<Minus className="stroke-3" />
								</Button>
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
								<svg
									className="w-full h-auto select-none"
									viewBox="0 0 640 3406"
									preserveAspectRatio="xMidYMid meet"
								>
									<Floor3SVG ref={svgRef} />
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
									{origin && (
										<polyline
											key={`${origin.latitude}-${origin.longitude}`}
											points={origin.points}
											strokeDasharray="10"
											className="stroke-red-700 fill-none stroke-3 animate-pulse"
										/>
									)}
									{steps.map((node) => (
										<polyline
											key={node.points}
											points={node.points}
											strokeDasharray="10"
											className="stroke-red-700 fill-none stroke-3 animate-pulse"
										/>
									))}
									{destination && (
										<polyline
											key={`${destination.latitude}-${destination.longitude}`}
											points={destination.points}
											strokeDasharray="10"
											className="stroke-red-700 fill-none stroke-3 animate-pulse"
										/>
									)}
								</svg>
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
