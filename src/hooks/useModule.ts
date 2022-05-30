import { collection, query, where, getDocs } from "firebase/firestore";
import { omit, orderBy } from "lodash";
import { db } from "../firebase/clientApp";
import { useDispatch } from "react-redux";
import { setModules } from "../features/selectedCourse-slice";

const COLLECTION_NAME = "modules";

type Sequence = {
  id: string;
  order: number;
};

export type Module = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  coursesIds: string[];
  order: number;
};

export const useModule = () => {
  const dispatch = useDispatch();
  const docRef = collection(db, COLLECTION_NAME);

  const getModulesByCourseId = async (courseId: string) => {
    try {
      const q = query(docRef, where("coursesIds", "array-contains", courseId));
      const querySnapshot = await getDocs(q);
      let modules: Module[] = [];
      querySnapshot.forEach((doc) => {
        const sequence = doc.data().sequence.find((s: Sequence) => s.id === courseId)?.order ?? 1;
        modules.push(omit({ ...doc.data(), order: sequence, id: doc.id }, ["sequence"]) as Module);
      });
      const orderedModules = orderBy(modules, ["order"], ["asc"]);
      dispatch(setModules(orderedModules));
      return orderedModules;
    } catch (error) {
      console.log(error);
    }
  };
  return { getModulesByCourseId };
};
