import type { Classroom } from "../classroom/types";

export type DirectionRequest = {
	origin: string;
	destination: string;
};

export type DirectionResponse = {
	path: string[];
	nodes: DirectionNode[];
	origin: DirectionNode;
	destination: DirectionNode;
};

export type DirectionNode = Classroom & {
	type: NodeType;
	points: string;
};

export enum NodeType {
	classroom,
	connector,
	stairs,
	elevator,
}
