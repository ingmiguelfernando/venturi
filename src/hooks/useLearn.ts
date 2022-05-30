import { query, where, collection, getDocs, limit } from "firebase/firestore";
import { auth, db } from "../firebase/clientApp";
import { useDispatch } from "react-redux";
import { setLearn } from "../features/selectedCourse-slice";

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
  id: string;
  courseId: string;
  userId: string;
  modules: Module[];
};

export const useLearn = () => {
  const docRef = collection(db, COLLECTION_NAME);
  const dispatch = useDispatch();

  const getLearnByCourseId = async (courseId: string) => {
    try {
      const q = query(
        docRef,
        where("courseId", "==", courseId),
        where("userId", "==", auth.currentUser?.uid),
        limit(1)
      );
      let learns: Learn[] = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        learns.push({ ...doc.data(), id: doc.id } as Learn);
      });
      dispatch(setLearn(learns[0] ?? null));
      return learns;
    } catch (error) {
      console.log(error);
    }
  };
  return { getLearnByCourseId };
};
