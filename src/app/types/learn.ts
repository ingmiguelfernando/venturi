type Segment = {
  done: boolean;
  segmentId: string;
  time: string;
};

type Module = {
  moduleId: string;
  segments: Segment[];
};

export type Learn = {
  id: string;
  courseId: string;
  userId: string;
  modules: Module[];
};
