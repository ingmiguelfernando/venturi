import firebase from 'firebase/app'
import 'firebase/firestore';

const useCourse = () => {

  const createCourse = async (course: Course) => {

    return await firebase.firestore().collection("course")
      .add(course).then((docRef) => {
        return { id: docRef.id };
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  return { createCourse }
};

export type Course = {
  name: string;
  description: string;
  featured: boolean;
  imageUrl: string;
}

export { useCourse };
