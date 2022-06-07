import { omit, orderBy } from "lodash";
import { db } from "../../firebase/clientApp";
import { Sequence, Module } from "../../app/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getModulesByCourseId = createAsyncThunk(
  "selectedCourse/getModulesByCourseId",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const docRef = collection(db, "modules");
      const q = query(docRef, where("coursesIds", "array-contains", courseId));
      const querySnapshot = await getDocs(q);
      let modules: Module[] = [];
      querySnapshot.forEach((doc) => {
        const sequence = doc.data().sequence.find((s: Sequence) => s.id === courseId)?.order ?? 1;
        modules.push(omit({ ...doc.data(), order: sequence, id: doc.id }, ["sequence"]) as Module);
      });
      const orderedModules = orderBy(modules, ["order"], ["asc"]);
      return orderedModules;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);
