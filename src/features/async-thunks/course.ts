import { createAsyncThunk } from "@reduxjs/toolkit";
import { Course } from "../../app/types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/clientApp";

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
