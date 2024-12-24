import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import ProfileHeader from "./ProfileHeader";
import VideoSection from "./VideoSection";
import { useNavigate } from "react-router";
import axiosInstance from "../../utils/axiosInstance";

function ProfilePage() {
  const [haveVideo, setHaveVideo] = useState(false); 
  const [user, setUser] = useState({});
 
  useEffect(() => {
    if (window.location.pathname === "/profile") {
      axiosInstance
        .get("/user/current-user")
        .then((res) => {
          setUser(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
 

  useEffect(() => {
    if (user.videos && user.videos.length > 0) {
      setHaveVideo(false); 
    } else {
      setHaveVideo(true);
    }
  }, [user]);
  
  return (
    <main className="flex gap-2 overflow-hidden w-full flex-grow text-white bg-gradient-to-b from-[#0f0f0f] to-[#1b1b1b] border-t border-[#434343]">
      {/* left */}
      <div className="w-[18rem] mt-5 mb-5">
        <Profile user={user}/>
      </div>
      {/* right */}
      <section className="w-[100%] border-l border-[#434343] overflow-y-auto">
        <ProfileHeader />
        {haveVideo && (
          <h1 className=" text-zinc-400 p-10">You have no video posted</h1>
        )}

        {/* Video section */}
        {!haveVideo && <VideoSection videos={user?.videos}/>}
      </section>
    </main>
  );
}

export default ProfilePage;
