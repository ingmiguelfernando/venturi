import { Sequence } from "./sequence";

export type Segment = {
  id: string;
  name: string;
  videoUrl: string;
  order: number;
  moduleId: string[];
  sequence?: Sequence[];
};

export type GroupedSegments = {
  moduleId: string;
  segments: Segment[];
};
