import type { Classroom, Floor } from "../classroom/types";

export type DirectionRequest = {
  origin: string;
  destination: string;
};

export type DirectionResponse = {
  groups: FloorGroup[];
  origin: DirectionNode;
  destination: DirectionNode;
};

export type DirectionNode = Classroom & {
  type: NodeType;
};

export type FloorGroup = {
  fromFloor: Floor;
  toFloor: Floor;
  path: string;
  origin: DirectionNode;
  destination: DirectionNode;
};

export enum NodeType {
  classroom = "classroom",
  connector = "connector",
  stairs = "stairs",
  elevator = "elevator",
}
