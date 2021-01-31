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


initFirebase()

const useUser = () => {
    const [user, setUser] = useState<LocalUser>()
    const [errorMessage, setErrorMessage] = useState("")
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
                const userData = await mapUserData(response.user)
                setUser(userData);
            })
            .catch((err) => {
                debugger
                console.log(err);
                setErrorMessage(err);
            })
    }

    const signIn = async (email: string, password: string) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async (response) => {
                if (response.user === null) { return }
                const userData = await mapUserData(response.user)
                setUser(userData);
            })
            .catch((err) => {
                debugger
                console.log(err);
                setErrorMessage(err);
            })
    }

    useEffect(() => {
        // Firebase updates the id token every hour, this
        // makes sure the react state and the cookie are
        // both kept up to date
        debugger
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

    return { user, errorMessage, logout, login, signIn }
}

export { useUser }