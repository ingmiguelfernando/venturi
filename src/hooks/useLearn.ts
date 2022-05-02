import { getAuth } from "firebase/auth";
import { query, where, collection, getDocs, getFirestore, limit } from "firebase/firestore";

const COLLECTION_NAME = "learns";

type Segment = {
  done: boolean;
  segmentId: string;
  time: string;
};

type Module = {
  moduleId: string;
  segments: Segment[];
};

export type Learn = {
  courseId: string;
  userId: string;
  modules: Module[];
};

export const useLearn = () => {
  const auth = getAuth();
  const db = getFirestore(auth.app);
  const docRef = collection(db, COLLECTION_NAME);

  const hasLearn = async (courseId: string) => {
    try {
      const q = query(
        docRef,
        where("courseId", "==", courseId),
        where("userId", "==", auth.currentUser?.uid),
        limit(1)
      );
      const querySnapshot = (await getDocs(q)).size;
      return querySnapshot > 0;
    } catch (error) {
      console.log(error);
    }
  };
  return { hasLearn };
};
