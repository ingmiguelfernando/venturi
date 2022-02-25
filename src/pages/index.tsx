import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import SignIn from "../components/SignIn";

import { useAppDispatch } from "../app/hooks";
import { showNotification, NotificationState } from "../features/notification-slice";

export default function Home() {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();

  const message: NotificationState = {
    message: "Welcome to the app",
    type: "info",
  };

  const login = () => {
    signInWithEmailAndPassword(auth, "ing.miguel.fernando@gmail.com", "y5ab2JLTT4yJCv9");
  };
  const logout = () => {
    signOut(auth);
  };

  const [value, loading, error] = useCollection(collection(getFirestore(), "course"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <div>
      <SignIn />
      <button onClick={() => dispatch(showNotification(message))}>show info notification</button>
      <button
        onClick={() =>
          dispatch(
            showNotification({
              message: "error Message",
              type: "error",
              duration: 2000,
            } as NotificationState)
          )
        }
      >
        show error notification
      </button>
    </div>
  );
}
