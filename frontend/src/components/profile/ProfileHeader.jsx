import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom"; 
import { ProfileContext } from "../../contexts/profileContext/profileContext";
import { toast } from "react-toastify";
function ProfileHeader() { 
  const {
    setVideoSectionShow,
    setTweetsSectionShow,
    tweetsSectionShow,
    videoSectionShow,
  } = useContext(ProfileContext);

  const handleVideoShow = () => {
    setVideoSectionShow(true);
    setTweetsSectionShow(false);
  };
  const handleTweetsShow = () => {
    setVideoSectionShow(false);
    setTweetsSectionShow(true);
  };

  const darkClass = "dark:text-zinc-700";
  const darkClassActive = "dark:!text-zinc-900 dark:border-black";

  return (
    <nav className="w-full ">
      <h1 className="text-[1.3rem] px-8 mt-8">Channel Content</h1>
      <ul className="flex gap-5 mt-5 pb-0 px-8">
        <section
          onClick={handleVideoShow}
          className={`hover:border-b text-[.9rem] text-zinc-400 font-[500] hover:border-zinc-500 cursor-pointer p-2 px-1 flex items-center gap-2 ${darkClass} ${
            videoSectionShow
              ? `!font-[800] border-b-2 border-white text-white ${darkClassActive}`
              : ""
          }`}
        >
          <h1>Videos</h1>
        </section>
        <section
          onClick={handleTweetsShow}
          className={`hover:border-b text-[.9rem] text-zinc-400 font-[500] hover:border-zinc-500 cursor-pointer p-2 px-1 flex items-center gap-2 ${darkClass} ${
            tweetsSectionShow
              ? `!font-[800] border-b-2 border-white text-white ${darkClassActive}`
              : ""
          }`}
        >
          <h1>Tweets</h1>
        </section>
        <NavLink
          to="#"
          onClick={() => toast.info("Feature coming soon!")}
          className={({ isActive }) =>
            `hover:border-b text-[.9rem] text-zinc-400 font-[500] hover:border-zinc-500 p-2 px-1 flex items-center gap-2 ${darkClass} ${
              !isActive ? `!font-[800] border-b-2 border-white text-white ${darkClassActive}` : ""
            }`
          }
        >
          <h1>Shorts</h1>
        </NavLink>
        <NavLink
          to="#"
          onClick={() => toast.info("Feature coming soon!")}
          className={({ isActive }) =>
            `hover:border-b text-[.9rem] text-zinc-400 font-[500] hover:border-zinc-500 p-2 px-1 flex items-center gap-2 ${darkClass} ${
              !isActive ? `!font-[800] border-b-2 border-white text-white ${darkClassActive}` : ""
            }`
          }
        >
          <h1>Live</h1>
        </NavLink>
      </ul>
      <div className="w-full h-[1px] border-t border-[#434343]"></div>
    </nav>
  );
}

export default ProfileHeader;
