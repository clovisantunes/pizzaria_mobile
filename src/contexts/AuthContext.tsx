import React, {useState, createContext, ReactNode} from "react";
type AuthContextData ={
    user:userProps;
    isAuthenticated: boolean;
}

type userProps ={
    id: string;
    name: string;
    email: string;
    token: string;
}
type AuthProviderProps = {
    children: ReactNode
}
export const AuthContext = createContext({}as AuthContextData);

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<userProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    })
    const isAuthenticated = !!user.name;
    return(
        <AuthContext.Provider value={{user, isAuthenticated}}>
        {children}
        </AuthContext.Provider>
    )
}