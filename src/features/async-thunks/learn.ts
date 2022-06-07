import { createAsyncThunk } from "@reduxjs/toolkit";
import { query, where, collection, getDocs, limit } from "firebase/firestore";
import { auth, db } from "../../firebase/clientApp";
import { Learn } from "../../app/types/learn";

export const getLearnByCourseId = createAsyncThunk(
  "selectedCourse/getLearnByCourseId",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const docRef = collection(db, "learns");
      const q = query(
        docRef,
        where("courseId", "==", courseId),
        where("userId", "==", auth.currentUser?.uid),
        limit(1)
      );
      let learn: Learn | null = null;
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        learn = { ...doc.data(), id: doc.id } as Learn;
      });
      return learn;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);
