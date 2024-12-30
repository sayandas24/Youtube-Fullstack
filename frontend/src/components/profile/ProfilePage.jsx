import React, { useContext, useEffect, useState } from "react";
import ProfileSection from "./ProfileSection";
import ProfileHeader from "./ProfileHeader";
import VideoSection from "./VideoSection";
import axiosInstance from "../../utils/axiosInstance";
import Sidebar2 from "../Layout/Sidebar2";
import { CollapseContext } from "../../contexts/collapseMenu/CollapseContext";
import VideoDetailSkeleton from "../UI/skeleton/VideoDetailSkeleton";
import { useNavigate } from "react-router";
import { FeatureSoonContext } from "../../contexts/featureSoonContext/UseFeatureSoon";

function ProfilePage() {
  const isRouteActive = location.pathname.startsWith(`/profile`);

  const { collapse2, setCollapse2 } = useContext(CollapseContext);
  const {handleFeatureSoonShow} = useContext(FeatureSoonContext);
  
  const [loading, setLoading] = useState(true);
  const [haveVideo, setHaveVideo] = useState(false);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setCollapse2(true);

    if (window.location.pathname === "/profile") {
      axiosInstance
        .get("/user/current-user")
        .then((res) => {
          setUser(res.data.data);
          setLoading(false);
        })
        .catch((err) => { 
          handleFeatureSoonShow("Login to show your profile") 
          console.log(err);
          setLoading(false);
          navigate("/login")
        })
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
      <div
        className={`${
          isRouteActive && collapse2 ? "-translate-x-[18rem]  " : ""
        } transition-all duration-150 top-[0] left-0 z-[999] fixed sidebar`}
      >
        <Sidebar2 />
      </div>

      {/* left */}
      <div className="w-[18rem] mt-5 mb-5">
        <ProfileSection user={user} />
      </div>
      {/* right */}
      <section className="w-[100%] border-l border-[#434343] overflow-y-auto">
        <ProfileHeader />
        {haveVideo && !loading && (
          <h1 className=" text-zinc-400 p-10">You have no video posted</h1>
        )}
        {loading && <VideoDetailSkeleton number={2} />}

        {/* Video section */}
        {!haveVideo && <VideoSection videos={user?.videos} />}
      </section>
    </main>
  );
}

export default ProfilePage;
