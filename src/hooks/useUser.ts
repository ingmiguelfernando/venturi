import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { showNotification, NotificationState } from "../features/notification-slice";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/clientApp";

const ERROR_CREATING_USER = "Error creating the user";
const USER_OR_PASSWORD_WRONG = "The email address or password is wrong";
const USER_CREATED = "The user was created, please check your email to verify your account";

export const useUser = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      dispatch(
        showNotification({ message: USER_OR_PASSWORD_WRONG, type: "error" } as NotificationState)
      );
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.log("error during sing out", error);
    }
  };

  const createUser = async (email: string, password: string) => {
    try {
      createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
        await sendEmailVerification(userCredential.user);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: userCredential.user.displayName,
          provider: userCredential.user.providerData[0].providerId,
          photoURL: userCredential.user.photoURL,
        });
        dispatch(showNotification({ message: USER_CREATED, type: "success" } as NotificationState));
      });
    } catch (error) {
      dispatch(
        showNotification({ message: ERROR_CREATING_USER, type: "error" } as NotificationState)
      );
    }
  };

  return {
    user,
    signIn,
    signOut,
    createUser,
  };
};
