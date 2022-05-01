import { getAuth } from "firebase/auth";
import { collection, getFirestore, query, where, getDocs } from "firebase/firestore";

const COLLECTION_NAME = "modules";

export type Modules = {
  name: string;
  imageUrl: string;
  description: string;
  coursesIds: string[];
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
        modules.push(doc.data() as Modules);
      });
      return modules;
    } catch (error) {
      console.log(error);
    }
  };
  return { getModulesByCourseId };
};
