import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/clientApp";
import { useDispatch } from "react-redux";
import { setCourse } from "../features/selectedCourse-slice";

const COLLECTION_NAME = "courses";

export type Course = {
  id: string;
  name: string;
  featured: true;
  imageUrl: string;
  description: string;
};

export const useCourse = () => {
  const dispatch = useDispatch();
  const getCourse = async (id: string) => {
    debugger;
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const course = { ...docSnap.data(), id } as Course;
        dispatch(setCourse(course));
        return course;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { getCourse };
};
