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
import ProfileDashboard from "./ProfileDashboard";
import { ProfileContext } from "../../contexts/profileContext/profileContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import TweetsSection from "./TweetsSection";

function ProfilePage() {
  const isRouteActive = location.pathname.startsWith(`/profile`);

  const { collapse2, setCollapse2 } = useContext(CollapseContext);
  const { handleFeatureSoonShow } = useContext(FeatureSoonContext);
  const { videoSectionShow, profileContent, tweetsSectionShow } =
    useContext(ProfileContext);

  const [loading, setLoading] = useState(true);
  const [haveVideo, setHaveVideo] = useState(false);
  const [user, setUser] = useState({});
  const [showDashboard, setShowDashboard] = useState(false);
  const [showUserContent, setShowUserContent] = useState(true);
  const [smallProfile, setSmallProfile] = useState(true);
  const [sidebarMobile, setSidebarMobile] = useState(false);
  const [tweets, setTweets] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setCollapse2(true);
    setSidebarMobile(true);

    if (window.location.pathname === "/profile") {
      axiosInstance
        .get("/user/current-user")
        .then((res) => {
          setUser(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          handleFeatureSoonShow("Login to show your profile");
          console.log(err);
          setLoading(false);
          navigate("/login");
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

  // tweets
  useEffect(() => {
    axiosInstance
      .get(`/tweet/${user._id}`)
      .then((res) => {
        setTweets(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setTweets([]);
        console.log("Unable to fetch tweets", err);
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    if (profileContent === "dashboard") {
      setShowDashboard(true);
      setShowUserContent(false);
    }
    if (profileContent === "content") {
      setShowDashboard(false);
      setShowUserContent(true);
    }
  }, [profileContent]);

  const handleClickOutsideSidebar = (event) => {
    if (
      !event.target.closest(".small-profile-btn") &&
      !event.target.closest(".dashboard-options")
    ) {
      setSidebarMobile(true);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutsideSidebar);

    return () => {
      document.removeEventListener("click", handleClickOutsideSidebar);
    };
  }, []);

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
      {smallProfile && (
        <div
          onClick={() => setSidebarMobile(!sidebarMobile)}
          className={`${
            !sidebarMobile ? "border border-red-500" : ""
          } small-profile-btn w-[3rem] h-[3rem] rounded-full overflow-hidden absolute left-4 mt-2 bottom-4 cursor-pointer max-[500px]:bottom-[4rem] min-[1000px]:hidden`}
        >
          <img
            className="w-full h-full object-cover"
            src={user.avatar}
            alt=""
          />
        </div>
      )}
      <div
        id="small-screen-left"
        className={`${
          sidebarMobile
            ? "max-[1000px]:scale-0 max-[1000px]:translate-x-[-7rem] max-[1000px]:translate-y-[15rem] max-[500px]:translate-y-[15rem]"
            : "max-[1000px]:motion-scale-in-100 "
        } dashboard-options w-[18rem] !p-0 left-5 max-[350px]:w-[15rem]`}
      >
        <ProfileSection
          user={user}
          showDashboard={showDashboard}
          showUserContent={showUserContent}
        />
      </div>
      {/* right */}
      {showDashboard && (
        <section className="w-[100%] border-[#434343] overflow-y-auto">
          {/* <ProfileDashboard user={user} /> */}
          {loading && (
            <SkeletonTheme baseColor="#202020" highlightColor="#333">
              <div className="card-skeleton rounded-xl w-full mb-2 px-[2rem] pt-[1.5rem]">
                <Skeleton borderRadius={5} count={3} height={"3rem"} />
              </div>
              <div className="card-skeleton rounded-xl w-full mb-2 px-[2rem] pt-[1.5rem]">
                <Skeleton borderRadius={5} count={3} height={"3rem"} />
              </div>
              <div className="card-skeleton rounded-xl w-full mb-2 px-[2rem] pt-[1.5rem]">
                <Skeleton borderRadius={5} count={3} height={"3rem"} />
              </div>
              <div className="card-skeleton rounded-xl w-full mb-2 px-[2rem] pt-[1.5rem]">
                <Skeleton borderRadius={5} count={3} height={"3rem"} />
              </div>
            </SkeletonTheme>
          )}
           <ProfileDashboard user={user} />
        </section>
      )}

      {showUserContent && (
        <section className="w-[100%] border-l border-l-transparent border-[#434343] overflow-y-auto">
          <ProfileHeader />
          
          {loading && <VideoDetailSkeleton number={2} />}

          {/* Video section */}
          {videoSectionShow && <VideoSection videos={user?.videos} />}
          {/* tweet section */}
          {tweetsSectionShow && <TweetsSection tweets={tweets} user={user} />}
        </section>
      )}
    </main>
  );
}

export default ProfilePage;
