import { createContext, useCallback, useContext, useState } from "react";

interface AppStore {
    isLoggedIn: boolean;
    logout: () => void;
    login: (value: string) => void;
    user?: User;
}

export const AppContext = createContext<AppStore>({
    isLoggedIn: true,
    logout: () => {},
    login: () => {},
    user: undefined
});

export interface User {
    id: string,
    email: string
}

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({children}) => {
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

    return (
        <AppContext.Provider value={{
            isLoggedIn,
            logout,
            login,
            user,
            setUser
        }}>
        {children}
        </AppContext.Provider>
    )
}