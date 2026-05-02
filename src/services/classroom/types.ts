export type Classroom = {
  id: string;
  title: string;
  description: string;
  floor: Floor;
  latitude: number;
  longitude: number;
};

export enum Floor {
  first = 1,
  second = 2,
  third = 3,
  fourth = 4,
  fifth = 5,
  sixth = 6,
  seventh = 7,
}

export type SearchClassroomResponse = {
  classrooms: Classroom[];
  total: number;
  limit: number;
};
