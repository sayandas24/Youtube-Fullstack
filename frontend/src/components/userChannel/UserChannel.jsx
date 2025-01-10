import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink, useLocation, Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import UserChannelSkeleton from "../UI/skeleton/UserChannelSkeleton";
import timeSince from "../../utils/timeSince";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Sidebar2 from "../Layout/Sidebar2";
import { CollapseContext } from "../../contexts/collapseMenu/CollapseContext";
import NProgress from "nprogress";

function UserChannel() {
  const { channel } = useParams();
  const [userDetail, setUserDetail] = useState({});
  const [currUser, setCurrUser] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const { collapse2, setCollapse2 } = useContext(CollapseContext);

  const location = useLocation();
  const isRouteActive = location.pathname.startsWith(`/channel/`);

  useEffect(() => {
    NProgress.start();
    setCollapse2(true);
    axiosInstance
      .get(`/user/channel/${channel}`)
      .then((res) => {
        NProgress.done();
        setUserDetail(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        NProgress.done();
        setLoading(false);
      });
  }, []);

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
    console.log(userDetail);
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
              <div className="w-full relative rounded-xl group border border-[#191919] h-[15rem] overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={userDetail ? userDetail.coverImage : ""}
                  alt="banner"
                />
              </div>
            )}
          </section>
          {/* profile */}
          <section className="my-5 ">
            <div className=" flex gap-3">
              {loading ? (
                <Skeleton circle width={"10rem"} height={"10rem"} />
              ) : (
                <section className=" border border-[#191919] relative left w-[10rem] h-[10rem] rounded-full overflow-hidden">
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
                  <p className={`${error ? "visible" : "invisible"} `}>
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
            <div className="flex gap-5 text-xl font-semibold">
              <h1 className="border-b-2 rounded-[5px] pb-2">Playlists</h1>
              <h1 className="pb-2">
                {/* <SearchIcon className="!text-3xl text-zinc-500" /> */}
              </h1>
            </div>
            <hr className="border-t border-zinc-600" />
          </section>

          {/* playlists */}
          <h1 className="my-2 text-xl">Created Playlist</h1>
          <section className="flex flex-wrap gap-5 my-5">
            {loading ? (
              <UserChannelSkeleton number={4} />
            ) : (
              userDetail.videos &&
              userDetail.videos.map((playlist) => (
                <main key={playlist._id} className="flex gap-5">
                  <section className="flex flex-col gap-2">
                    <Link to={`/p/${playlist._id}`} className="w-[20rem] h-[12rem] cursor-pointer border border-[#393939] rounded-xl overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={playlist.thumbnail}
                        alt=""
                      />
                    </Link>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-[15px]">{playlist.title}</h1>
                      <p className="text-[15px] text-zinc-500">
                        {playlist.totalViews} views .{" "}
                        {timeSince(playlist.createdAt)}
                      </p>
                    </div>
                  </section>
                </main>
              ))
            )}
          </section>
        </main>
      </div>
    </SkeletonTheme>
  );
}

export default UserChannel;
