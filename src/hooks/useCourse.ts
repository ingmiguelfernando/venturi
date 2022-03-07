import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const COLLECTION_NAME = "courses";

export type Course = {
    description: string;
    featured: true;
    imageUrl: string
    name: string
}

export const useCourse = () => {
    const auth = getAuth();
    const db = getFirestore(auth.app);

    const getCourse = async (id: string) => {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data() as Course;
            } else {
                return null
            }
        } catch (error) {
            console.log(error);
        }
    }
    return { getCourse };

}

