import firebase from 'firebase/app'
import 'firebase/firestore';

const courseRef = firebase.firestore().collection("course");

const useCourse = () => {

  const createCourse = async (course: Course) => {
    return await courseRef
      .add(course)
      .then((docRef) => {
        return { id: docRef.id };
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  const updateCourse = async (course: Course) => {
    return await courseRef
      .doc(course.id).update(course)
      .then(() => {
        return true
      })
      .catch((error) => {
        console.error("Error updating the document: ", error);
      });
  }

  const getCourses = async () => {
    let courses: Course[] = [];
    await courseRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          courses.push({ ...doc.data(), id: doc.id } as Course)
        });
        return courses;
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    return courses;
  }

  const getCourse = async (courseId: string) => {
    return await courseRef.doc(courseId).get()
      .then((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      .catch((error) => {
        console.log("Error getting the document: ", error);
      }) as Course;
  }

  return { createCourse, updateCourse, getCourses, getCourse }
};

export type Course = {
  id?: string;
  name: string;
  description: string;
  featured: boolean;
  imageUrl: string;
}

export { useCourse };
