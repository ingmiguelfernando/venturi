import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/clientApp";
import { omit } from "lodash";
import { useDispatch } from "react-redux";
import { setSegments } from "../features/selectedCourse-slice";

const COLLECTION_NAME = "segments";

type Sequence = {
  id: string;
  order: number;
};

export type Segment = {
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

export const useSegment = () => {
  const docRef = collection(db, COLLECTION_NAME);
  const dispatch = useDispatch();

  const getSegmentsByModuleIds = async (moduleIds: string[]) => {
    try {
      const q = query(docRef, where("moduleId", "array-contains-any", moduleIds));
      const querySnapshot = await getDocs(q);
      let groupedSegments: GroupedSegments[] = [];

      querySnapshot.forEach((doc) => {
        const segment = doc.data() as Segment;
        segment.moduleId.forEach((moduleId) => {
          if (moduleIds.includes(moduleId)) {
            const segmentGroup = groupedSegments.find((group) => group.moduleId === moduleId);
            const sequence = segment?.sequence?.find((s) => s.id === moduleId)?.order ?? 1;
            const segmentToAdd = omit({ ...segment, order: sequence }, ["sequence"]);

            if (segmentGroup) {
              segmentGroup.segments.push(segmentToAdd);
            } else {
              groupedSegments.push({
                moduleId,
                segments: [segmentToAdd],
              });
            }
          }
        });
      });
      dispatch(setSegments(groupedSegments));
      return groupedSegments;
    } catch (error) {
      console.log(error);
    }
  };
  return { getSegmentsByModuleIds };
};
