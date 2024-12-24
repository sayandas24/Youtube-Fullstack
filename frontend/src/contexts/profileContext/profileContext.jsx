import React, { createContext, useState } from "react";

export const ProfileContext = createContext()

export const ProfileProvider = ({children}) => {
      const [deleteClick, setDeleteClick] = useState(false);
    //   pass details to delete menu pass from ThreeDot to DeleteMenu
    
    return (
        <ProfileContext.Provider value={{deleteClick, setDeleteClick}}>
            {children}
        </ProfileContext.Provider>
    )
}