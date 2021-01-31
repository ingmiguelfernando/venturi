export const mapUserData = async (user: User) => {
    const { uid, email } = user
    const token = await user.getIdToken(true)
    return {
        id: uid,
        email,
        token,
    } as LocalUser
}

export type LocalUser = {
    id: string
    email: string
    token: string,
}

export type User = {
    uid: string
    email: string | null
    token?: string
    getIdToken: (arg0: boolean) => Promise<string> | undefined
}