import { createContext, useContext, useState } from "react";

export const UseDarkModeContext = createContext()

export function UseDarkMode({children}) {
    const [darkMode, setDarkMode] = useState(false)

    return (
        <UseDarkModeContext.Provider value={{darkMode, setDarkMode}}>
            {children}
        </UseDarkModeContext.Provider>
    )
}