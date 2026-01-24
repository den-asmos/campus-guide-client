import type { Classroom } from "../classroom/types";

export type DirectionRequest = {
	origin: string;
	destination: string;
};

export type DirectionResponse = {
	nodes: DirectionNode[];
	path: string[];
};

export type DirectionNode = Classroom & {
	type: NodeType;
};

export enum NodeType {
	classroom,
	connector,
	stairs,
	elevator,
}
