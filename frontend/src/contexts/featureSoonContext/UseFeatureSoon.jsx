import { createContext, useContext, useState } from "react";

export const FeatureSoonContext = createContext()

export function FeatureSoonProvider({children}) {
    const [featureSoonShow, setFeatureSoonShow] = useState(false)
    const [isLoginUser, setIsLoginUser] = useState(true)
    const [featureMSG, setFeatureMSG] = useState("")

    const handleFeatureSoonShow = (msg="Feature Coming Soon") => {
        setFeatureSoonShow(true)
        setFeatureMSG(msg)

        setTimeout(() => {
            setFeatureSoonShow(false)
        }, 1000);
    }


    return (
        <FeatureSoonContext.Provider value={{featureSoonShow, handleFeatureSoonShow, featureMSG, setFeatureMSG, isLoginUser, setIsLoginUser}}>
            {children}
        </FeatureSoonContext.Provider>
    )
}