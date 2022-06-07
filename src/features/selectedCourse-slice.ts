import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, Module, Learn, GroupedSegments } from "../app/types";
import {
  getCourse,
  getModulesByCourseId,
  getLearnByCourseId,
  getSegmentsByModuleIds,
} from "./async-thunks";

export interface selectedCourseState {
  course: Course | undefined;
  modules: Module[] | undefined;
  segments: GroupedSegments[] | undefined;
  learn: Learn | undefined;
}

const initialState: selectedCourseState = {
  course: undefined,
  modules: undefined,
  segments: undefined,
  learn: undefined,
};

const selectedCourseSlice = createSlice({
  name: "selectedCourse",
  initialState,
  reducers: {
    setCourse: (state, action: PayloadAction<Course>) => {
      state.course = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCourse.fulfilled, (state, action) => {
        state.course = action.payload as Course;
      })
      .addCase(getModulesByCourseId.fulfilled, (state, action) => {
        state.modules = action.payload ?? [];
      })
      .addCase(getLearnByCourseId.fulfilled, (state, action) => {
        state.learn = action.payload as unknown as Learn;
      })
      .addCase(getSegmentsByModuleIds.fulfilled, (state, action) => {
        state.segments = action.payload ?? [];
      });
  },
});

export const { setCourse } = selectedCourseSlice.actions;
export default selectedCourseSlice.reducer;
