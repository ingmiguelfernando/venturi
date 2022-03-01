import { useEffect, useState } from 'react'
import { useAppDispatch } from '../app/hooks';
import { showNotification, NotificationState } from '../features/notification-slice';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, User, } from "firebase/auth";

const ERROR_CREATING_USER = 'Error creating the user'
const USER_OR_PASSWORD_WRONG = 'The email address or password is wrong'
const USER_CREATED = 'The user was created, please check your email to verify your account'

export const useUser = () => {
    const auth = getAuth();
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user)
        })
        return () => {
            unsubscribe()
        }
    }, [auth])

    const signIn = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            setUser(userCredential.user)
        } catch (error) {
            dispatch(showNotification({ message: USER_OR_PASSWORD_WRONG, type: "error" } as NotificationState))
        }
    }

    const signOut = async () => {
        try {
            const auth = getAuth()
            await auth.signOut()
            setUser(null)
        } catch (error) {
            console.log("error during sing out", error)
        }
    }

    const createUser = async (email: string, password: string) => {
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    await sendEmailVerification(userCredential.user)
                    dispatch(showNotification({ message: USER_CREATED, type: "success" } as NotificationState))
                })

        } catch (error) {
            dispatch(showNotification({ message: ERROR_CREATING_USER, type: "error" } as NotificationState))
        }
    }

    return {
        user,
        signIn,
        signOut,
        createUser
    }

}
