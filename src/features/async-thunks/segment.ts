import { omit } from "lodash";
import { db } from "../../firebase/clientApp";
import { GroupedSegments, Segment } from "../../app/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getSegmentsByModuleIds = createAsyncThunk(
  "selectedCourse/getSegmentsByModuleIds",
  async (moduleIds: string[], { rejectWithValue }) => {
    try {
      const docRef = collection(db, "segments");
      const q = query(docRef, where("moduleId", "array-contains-any", [...moduleIds]));
      const querySnapshot = await getDocs(q);
      let groupedSegments: GroupedSegments[] = [];

      querySnapshot.forEach((doc) => {
        const segment = doc.data() as Segment;
        segment.moduleId.forEach((moduleId) => {
          if (moduleIds.includes(moduleId)) {
            const segmentGroup = groupedSegments.find((group) => group.moduleId === moduleId);
            const sequence = segment?.sequence?.find((s) => s.id === moduleId)?.order ?? 1;
            const segmentToAdd = omit({ ...segment, id: doc.id, order: sequence }, ["sequence"]);

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
      return groupedSegments;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);
