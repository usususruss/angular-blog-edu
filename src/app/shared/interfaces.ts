
export interface User {
    email: string
    password: string
    returnSecureToken?: boolean
}

export interface FbAuthResponse {
    displayName: string
    email: string
    expiresIn: string
    idToken: string
    kind: string
    localId: string
    refreshToken: string
    registered: boolean
}
