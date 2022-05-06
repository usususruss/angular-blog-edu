export interface Environment {
    apiKey: string,
    production: boolean
}

// For setting up Firebase SDK, if need in future
export interface FirebaseConfig {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
}
