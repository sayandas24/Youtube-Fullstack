import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FeatureSoonContext } from "../../contexts/featureSoonContext/UseFeatureSoon";
import { ProfileContext } from "../../contexts/profileContext/profileContext";
function ProfileHeader() {
  const [videoActive, setVideoActive] = useState(true);
  const [tweetsActive, setTweetsActive] = useState(false);

  const { handleFeatureSoonShow } = useContext(FeatureSoonContext);
  const { setVideoSectionShow, setTweetsSectionShow } =
    useContext(ProfileContext);

  const handleVideoShow = () => {
    setVideoSectionShow(true);
    setTweetsSectionShow(false);
    setVideoActive(true);
    setTweetsActive(false);
  };
  const handleTweetsShow = () => {
    setVideoSectionShow(false);
    setTweetsSectionShow(true);
    setVideoActive(false);
    setTweetsActive(true);
  };

  return (
    <nav className="w-full ">
      <h1 className="text-[1.3rem] px-8 mt-8">Channel Content</h1>
      <ul className="flex gap-5 mt-5 pb-0 px-8">
        <section
          onClick={handleVideoShow}
          className={`hover:border-b text-[.9rem] text-zinc-400 font-[500] hover:border-zinc-500 p-2 px-1 flex items-center gap-2 ${
            videoActive ? "!font-[800] border-b !border-white !text-white" : ""
          }`}
        >
          <h1>Videos</h1>
        </section>
        <section
          onClick={handleTweetsShow}
          className={`hover:border-b text-[.9rem] text-zinc-400 font-[500] hover:border-zinc-500 p-2 px-1 flex items-center gap-2 ${
            tweetsActive ? "!font-[800] border-b !border-white !text-white" : ""
          }`}
        >
          <h1>Tweets</h1>
        </section>
        <NavLink
          to="#"
          onClick={() => handleFeatureSoonShow()}
          className={({ isActive }) =>
            `hover:border-b text-[.9rem] text-zinc-400 font-[500] hover:border-zinc-500 p-2 px-1 flex items-center gap-2 ${
              !isActive ? "!font-[800] border-b !border-white !text-white" : ""
            }`
          }
        >
          <h1>Shorts</h1>
        </NavLink>
        <NavLink
          to="#"
          onClick={() => handleFeatureSoonShow()}
          className={({ isActive }) =>
            `hover:border-b text-[.9rem] text-zinc-400 font-[500] hover:border-zinc-500 p-2 px-1 flex items-center gap-2 ${
              !isActive ? "!font-[800] border-b !border-white !text-white" : ""
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
