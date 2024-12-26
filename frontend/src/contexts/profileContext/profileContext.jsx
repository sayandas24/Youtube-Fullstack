import React, { createContext, useState } from "react";

export const ProfileContext = createContext()

export const ProfileProvider = ({children}) => {
      const [deleteClick, setDeleteClick] = useState(false);
      const [videoDetails, setVideoDetails] = useState({})
    //   pass details to delete menu pass from ThreeDot to DeleteMenu
    
    return (
        <ProfileContext.Provider value={{deleteClick, setDeleteClick, videoDetails, setVideoDetails}}>
            {children}
        </ProfileContext.Provider>
    )
}