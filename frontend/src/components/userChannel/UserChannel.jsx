import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink, useLocation, Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import UserChannelSkeleton from "../UI/skeleton/UserChannelSkeleton";
import timeSince from "../../utils/timeSince";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Sidebar2 from "../Layout/Sidebar2";
import { CollapseContext } from "../../contexts/collapseMenu/CollapseContext";
import NProgress from "nprogress";
import Playlists from "./Playlists";
import Tweets from "../profile/Tweets";

function UserChannel() {
  const { channel } = useParams();
  const [userDetail, setUserDetail] = useState({});
  const [currUser, setCurrUser] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPlaylists, setShowPlaylists] = useState(true);
  const [showTweets, setShowTweets] = useState(false);
  const [allTweets, setAllTweets] = useState([]);

  const { collapse2, setCollapse2 } = useContext(CollapseContext);

  const location = useLocation();
  const isRouteActive = location.pathname.startsWith(`/channel/`);

  console.log(channel)

  useEffect(() => {
    NProgress.start();
    setCollapse2(true);
    if (channel) {
      axiosInstance
      .get(`/user/channel/${channel}`)
      .then((res) => {
        NProgress.done();
        setUserDetail(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("cannot get channel: ",err);
        NProgress.done();
        setLoading(false);
      });
    }
  }, []);
 

  // fetch current user
  useEffect(() => {
    axiosInstance
      .get("/user/current-user")
      .then((res) => {
        setCurrUser(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubscribe = () => {
    if (!currUser._id) {
      console.log("not logged in");
      setError(true);
    } 
    if (userDetail.isSubscribed == false) {
      axiosInstance
        .get(`/subscription/subscribe/${userDetail._id}`)
        .then((res) => {
          // Update the subscriber count in the state
          setUserDetail((prev) => ({
            ...prev,
            subscribersCount: prev.subscribersCount + 1,
            isSubscribed: true,
          }));
        });
    }
    if (userDetail.isSubscribed == true) {
      axiosInstance
        .get(`/subscription/unsubscribe/${userDetail._id}`)
        .then((res) => {
          // Update the subscriber count in the state
          setUserDetail((prev) => ({
            ...prev,
            subscribersCount: prev.subscribersCount - 1,
            isSubscribed: false,
          }));
        });
    }
  };

  const handlePlaylistClick = () => {
    setShowPlaylists(true);
    setShowTweets(false);
  };

  const handleTweetsClick = () => {
    setShowPlaylists(false);
    setShowTweets(true);
  };

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#333">
      <div className="flex w-full text-white">
        <div
          className={`${
            isRouteActive && collapse2 ? "-translate-x-[18rem]  " : ""
          } transition-all duration-150 top-[0] left-0 z-[999] fixed sidebar`}
        >
          <Sidebar2 />
        </div>

        <main className="flex flex-col w-[85rem] mx-auto">
          {/* banner */}
          <section className="w-full my-5">
            {/* banner */}
            {loading ? (
              <Skeleton
                borderRadius={15}
                className="w-full relative group border border-[#191919] h-[15rem] overflow-hidden"
              />
            ) : (
              <div className="w-full relative rounded-xl group border-blue-500 h-[13rem] overflow-hidden max-[500px]:h-[10rem]">
                <img
                  className="w-full h-full object-cover"
                  src={userDetail ? userDetail.coverImage : ""}
                  alt="banner"
                />
              </div>
            )}
          </section>
          {/* profile */}
          <section className="my-5 ml-2 max-[500px]:my-0 max-[500px]:mb-3">
            <div className=" flex gap-3">
              {loading ? (
                <Skeleton circle width={"10rem"} height={"10rem"} />
              ) : (
                <section className=" group relative left w-[10rem] h-[10rem] rounded-full overflow-hidden max-[500px]:w-[7rem] max-[500px]:h-[7rem] flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={userDetail ? userDetail.avatar : ""}
                    alt=""
                  />
                </section>
              )}

              {loading ? (
                <Skeleton
                  count={3}
                  borderRadius={10}
                  className="mt-2"
                  width={"20rem"}
                  height={"1.5rem"}
                  containerClassName="mt-8"
                />
              ) : (
                <section className="flex flex-col justify-center gap-2">
                  <h1 className="text-2xl font-semibold">
                    {userDetail ? userDetail.fullName : ""}
                  </h1>
                  <div className="text-[16px] text-zinc-500 pl-1 flex gap-2">
                    <p className="text-zinc-100">
                      @{userDetail ? userDetail.username : ""}
                    </p>
                    <p className="max-[500px]:hidden">
                      {userDetail ? userDetail.subscribersCount : "0"}{" "}
                      subscribers
                    </p>
                    <p className="max-[500px]:hidden">
                      {userDetail ? userDetail.videosCount : "0"} videos
                    </p>
                  </div>

                  <div className="min-[500px]:hidden text-[16px] text-zinc-500 pl-1 flex gap-2">
                    <p className="">
                      {userDetail ? userDetail.subscribersCount : "0"}{" "}
                      subscribers
                    </p>
                    <p className="">
                      {userDetail ? userDetail.videosCount : "0"} videos
                    </p>
                  </div>
                  <button
                    onClick={handleSubscribe}
                    className={`${
                      userDetail.isSubscribed
                        ? "bg-[#272727] shadow-inner shadow-[#313131]/100"
                        : "bg-[#ff0000]"
                    } p-[.4rem] w-fit px-6 rounded-full text-sm font-semibold  hover:text-white `}
                  >
                    {userDetail.isSubscribed ? "Unsubscribe" : "Subscribe"}
                  </button>
                  <p className={`${error ? "block" : "hidden"} `}>
                    Login to subscribe to this channel
                    <NavLink
                      className="ml-2 text-blue-400 font-semibold"
                      to={"/login"}
                    >
                      login?
                    </NavLink>{" "}
                  </p>
                </section>
              )}
            </div>
          </section>

          {/* playlists header*/}
          <section className=" w-full">
            <div className="flex gap-5 text-xl font-semibold pl-2">
              <h1
                onClick={handlePlaylistClick}
                className={`${
                  showPlaylists ? "border-b-2" : "text-zinc-400"
                } pb-2 cursor-pointer`}
              >
                Playlists
              </h1>
              <h1
                onClick={handleTweetsClick}
                className={`${
                  showTweets ? "border-b-2" : "text-zinc-400"
                } pb-2 cursor-pointer`}
              >
                Tweets
              </h1>
              {/* <SearchIcon className="!text-3xl text-zinc-500" /> */}
            </div>
            <hr className="border-t border-zinc-600" />
          </section>

          {/* playlists */}
          {showPlaylists && (
            <Playlists userDetail={userDetail} loading={loading} />
          )}
          {showTweets && <Tweets userDetail={userDetail} currUser={currUser} />}
        </main>
      </div>
    </SkeletonTheme>
  );
}

export default UserChannel;
