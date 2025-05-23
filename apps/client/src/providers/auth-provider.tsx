import { UserEntity } from "@pos/core/entities/user";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { TOKEN_KEY } from "../config";
import auth from "../api/auth";
import { SignInUserDto } from "@pos/core/dtos";
import TokenStorage from "../utils/token-storage";
import { RoleEnum } from "@pos/core/enums/role";
import routes from "../features/dashboard/routes";

export type AuthContextType = {
    user?: UserEntity,
    loading: boolean,
    login: (dto: SignInUserDto) => Promise<void>,
    logout: () => Promise<void>,
    redirect: string
}

const AuthContext = createContext<AuthContextType>({
    loading: false,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    redirect: ''
})
const tokenStorage = new TokenStorage(TOKEN_KEY)
let counter = 0;

export const AuthContextWrapper = (Element: () => ReactNode) => () => {
    const [user, setUser] = useState<AuthContextType['user']>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            const user = await getUser()
            setUser(user)
        })()
    }, [])

    async function getUser() {
        const token = tokenStorage.get()
        
        if(!token)
            return undefined

        setLoading(true);
        
        const user = await auth.getUser()
        console.log('called ', ++counter)

        setLoading(false)
        return user
    }

    async function login(dto: SignInUserDto){
        const { data } = await auth.login(dto)
        tokenStorage.save(data.accessToken)

        const user = await getUser()
        setUser(user)
    }

    async function logout() {
        tokenStorage.reset()
        setUser(undefined)
    }

    const loginPath = "/auth/login"
    const authorizedRoutes = routes.filter(route => route.isAuthorized(user))
    const redirect = user ? authorizedRoutes[0].url : loginPath

    return (
        <AuthContext.Provider 
            value={{ user, loading, login, redirect, logout }}
        >
            {<Element />}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw "Use Auth must bet enclosed in AuthContextWrapper"
    }
    return context;
};
