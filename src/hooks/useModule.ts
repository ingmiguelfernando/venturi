import { getAuth } from "firebase/auth";
import { collection, getFirestore, query, where, getDocs } from "firebase/firestore";
import { omit, orderBy } from "lodash";

const COLLECTION_NAME = "modules";

type Sequence = {
  id: string;
  order: number;
};

export type Modules = {
  name: string;
  imageUrl: string;
  description: string;
  coursesIds: string[];
  order: number;
};

export const useModule = () => {
  const auth = getAuth();
  const db = getFirestore(auth.app);
  const docRef = collection(db, COLLECTION_NAME);

  const getModulesByCourseId = async (courseId: string) => {
    try {
      const q = query(docRef, where("coursesIds", "array-contains", courseId));
      const querySnapshot = await getDocs(q);
      let modules: Modules[] = [];
      querySnapshot.forEach((doc) => {
        const sequence = doc.data().sequence.find((s: Sequence) => s.id === courseId)?.order ?? 1;
        modules.push(omit({ ...doc.data(), order: sequence }, ["sequence"]) as Modules);
      });
      return orderBy(modules, ["order"], ["asc"]);
    } catch (error) {
      console.log(error);
    }
  };
  return { getModulesByCourseId };
};
