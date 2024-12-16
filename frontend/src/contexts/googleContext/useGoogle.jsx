import { createContext, useContext, useEffect, useState } from "react";

const GoogleContext = createContext()

export function useGoogle() {
    return useContext(GoogleContext)
}

export function GoogleProvider({ children }) {

    const [googleData, setGoogleData] = useState({})

    function initializeGoogle(user) {
        setGoogleData(user)
    }

    const value = {
        googleData
    }
    return(
        <GoogleContext.Provider value={value}>
            {children}
        </GoogleContext.Provider>
    )
}