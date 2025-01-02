import React, { createContext, useState } from "react";

export const ProfileContext = createContext()

export const ProfileProvider = ({children}) => {
      const [deleteClick, setDeleteClick] = useState(false);
      const [videoDetails, setVideoDetails] = useState({})
      const [profileContent, setProfileContent] = useState(null)
    //   pass details to delete menu pass from ThreeDot to DeleteMenu
    function profileContentPassFunc(detail) {
        setProfileContent(detail) 
    }
    
    return (
        <ProfileContext.Provider value={{deleteClick , setProfileContent, profileContent, setDeleteClick, videoDetails, setVideoDetails, profileContentPassFunc}}>
            {children}
        </ProfileContext.Provider>
    )
}