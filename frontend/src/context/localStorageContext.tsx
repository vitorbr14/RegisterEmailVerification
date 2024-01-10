import { createContext } from "react";


type LocalStorageProviderProps = {
children: React.ReactNode
}
const retrivedToken = localStorage.getItem('tokenjwt');
export const jwtStorage = createContext(retrivedToken)

export const LocalStorageProvider = ({children}:LocalStorageProviderProps) => {
    return <jwtStorage.Provider value={retrivedToken}>{children}</jwtStorage.Provider>
}