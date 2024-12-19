import React, { createContext, useState } from "react";

export const CollapseContext = createContext()

export const CollapseProvider = ({children}) => {
    const [collapse, setCollapse] = useState(false)
    const [collapse2, setCollapse2] = useState(true)

    return (
        <CollapseContext.Provider value={{collapse, setCollapse, collapse2, setCollapse2}}>
            {children}
        </CollapseContext.Provider>
    )
}