import { createContext, useContext, useState } from "react";

export const FeatureSoonContext = createContext()

export function FeatureSoonProvider({children}) {
    const [featureSoonShow, setFeatureSoonShow] = useState(false)

    const handleFeatureSoonShow = () => {
        setFeatureSoonShow(true)

        setTimeout(() => {
            setFeatureSoonShow(false)
        }, 1000);
    }


    return (
        <FeatureSoonContext.Provider value={{featureSoonShow, handleFeatureSoonShow}}>
            {children}
        </FeatureSoonContext.Provider>
    )
}