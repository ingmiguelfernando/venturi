import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../auth/initFirebase'
import {
    removeUserCookie,
    setUserCookie,
    getUserFromCookie,
} from './userCookies'
import { mapUserData, LocalUser } from './mapUserData'


const VERIFY_EMAIL_MESSAGE = "Please verify your email address";



initFirebase()

const useUser = () => {
    const [user, setUser] = useState<LocalUser>()
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const router = useRouter()

    const logout = async () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                // Sign-out successful.
                router.push('/')
            })
            .catch((e) => {
                console.error(e)
            })
    }

    const login = async (email: string, password: string) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (response) => {
                if (response.user === null) { return }

                if (!response.user.emailVerified) {
                    setSuccessMessage(VERIFY_EMAIL_MESSAGE)
                    return
                }
                const userData = await mapUserData(response.user)
                setUser(userData);
                router.push('/home')
            })
            .catch((err) => {
                setErrorMessage(err.message);
            })
    }

    const signIn = async (email: string, password: string) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async (_) => {
                firebase.auth().currentUser?.sendEmailVerification().then(() =>
                    setSuccessMessage(VERIFY_EMAIL_MESSAGE)
                );
            })
            .catch((err) => {
                setErrorMessage(err.message);
            })
    }

    useEffect(() => {
        // Firebase updates the id token every hour, this
        // makes sure the react state and the cookie are
        // both kept up to date
        const cancelAuthListener = firebase
            .auth()
            .onIdTokenChanged(async (user) => {
                if (user) {
                    const userData = await mapUserData(user)
                    setUserCookie(userData)
                    setUser(userData)
                } else {
                    removeUserCookie()
                    setUser(undefined)
                }
            })

        const userFromCookie = getUserFromCookie()
        if (!userFromCookie) {
            router.push('/')
            return
        }
        setUser(userFromCookie)

        return () => {
            cancelAuthListener()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { user, errorMessage, setErrorMessage, successMessage, setSuccessMessage, logout, login, signIn }
}

export { useUser }