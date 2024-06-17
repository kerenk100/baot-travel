import { createContext, useCallback, useContext, useState } from "react";

interface AppStore {
    isLoggedIn: boolean;
    logout: () => void;
    login: (value: string) => void;
    user?: User;
    handleSetUser:(user: User | undefined )=> void;
}

export const AppContext = createContext<AppStore>({
    isLoggedIn: true,
    logout: () => {},
    login: () => {},
    user: undefined,
    handleSetUser: (user: User | undefined) => {}
});

export interface User {
    id: string,
    email: string
}

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({children}: {children:React.ReactNode}) => {
    const userFromLS = localStorage.getItem("user");
    const [user, setUser] = useState<User | undefined>(userFromLS ? JSON.parse(userFromLS): undefined);
    const [isLoggedIn,setLoggedIn] = useState(!!userFromLS);

    const logout = useCallback(() => {
        setLoggedIn(false);
        localStorage.removeItem("user");
        setUser(undefined);
    },[isLoggedIn]);

    const login = useCallback((value: string) => {
        setLoggedIn(true);
        localStorage.setItem("user", value);
        setUser(JSON.parse(value));
    },[isLoggedIn]);

    const handleSetUser=(user:User | undefined)=>{
        setUser(user)
    }

    return (
        <AppContext.Provider value={{
            isLoggedIn,
            logout,
            login,
            user,
            handleSetUser
        }}>
        {children}
        </AppContext.Provider>
    )
}