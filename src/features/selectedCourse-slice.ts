import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../hooks/useCourse";
import { Module } from "../hooks/useModule";
import { Learn } from "../hooks/useLearn";
import { GroupedSegments } from "../hooks/useSegment";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/clientApp";

export interface selectedCourseState {
  course: Course | null;
  modules: Module[];
  segments: GroupedSegments[];
  learn: Learn | null;
}

const initialState: selectedCourseState = {
  course: null,
  modules: [],
  segments: [],
  learn: null,
};

export const getCourse = createAsyncThunk(
  "selectedCourse/getCourse",
  async (id: string, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "courses", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const course = { ...docSnap.data(), id } as Course;
        return course;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);

const selectedCourseSlice = createSlice({
  name: "selectedCourse",
  initialState,
  reducers: {
    setCourse: (state, action: PayloadAction<Course>) => {
      state.course = action.payload;
    },
    setModules: (state, action: PayloadAction<Module[]>) => {
      state.modules = action.payload;
    },
    setSegments: (state, action: PayloadAction<GroupedSegments[]>) => {
      state.segments = action.payload;
    },
    setLearn: (state, action: PayloadAction<Learn>) => {
      state.learn = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getCourse.fulfilled, (state, action) => {
      state.course = action.payload ?? null;
    });
  },
});

export const { setCourse, setModules, setSegments, setLearn } = selectedCourseSlice.actions;
export default selectedCourseSlice.reducer;
