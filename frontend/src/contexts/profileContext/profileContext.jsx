import React, { createContext, useState } from "react";

export const ProfileContext = createContext()

export const ProfileProvider = ({children}) => {
      const [deleteClick, setDeleteClick] = useState(false);
      const [videoDetails, setVideoDetails] = useState({})
      const [profileContent, setProfileContent] = useState(null)
      const [videoSectionShow, setVideoSectionShow] = useState(true);
      const [tweetsSectionShow, setTweetsSectionShow] = useState(false);
    //   pass details to delete menu pass from ThreeDot to DeleteMenu
    function profileContentPassFunc(detail) {
        setProfileContent(detail) 
    }
    
    return (
        <ProfileContext.Provider value={{deleteClick , setProfileContent, profileContent, setDeleteClick, videoDetails, setVideoDetails, profileContentPassFunc, videoSectionShow, setVideoSectionShow, tweetsSectionShow, setTweetsSectionShow}}>
            {children}
        </ProfileContext.Provider>
    )
}