import React, { useEffect, useState } from "react";

import { useParams, useNavigate, NavLink } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

function UserChannel() {
  const { channel } = useParams();
  const [userDetail, setUserDetail] = useState({});
  const [currUser, setCurrUser] = useState({});
  const [error, setError] = useState(false)

  useEffect(() => {
    axiosInstance
      .get(`/user/channel/${channel}`)
      .then((res) => {
        setUserDetail(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  //   console.log(userDetail);

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
        console.log("not logged in")
      setError(true)
    }
    if (userDetail.isSubscribed == false) {
      axiosInstance
        .get(`/subscription/subscribe/${currUser._id}`)
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
        .get(`/subscription/unsubscribe/${currUser._id}`)
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
    <div className="flex w-full text-white">
      {/* <Sidebar /> */}

      <main className="flex flex-col w-[85rem] mx-auto">
        {/* banner */}
        <section className="w-full my-5">
          {/* banner */}
          <div className="w-full relative rounded-xl group border border-blue-500 h-[15rem] overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={userDetail ? userDetail.coverImage : ""}
              alt="banner"
            />
          </div>
        </section>
        {/* profile */}
        <section className="my-5 ">
          <div className=" flex gap-3">
            <section className=" border relative left w-[10rem] h-[10rem] rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={userDetail ? userDetail.avatar : ""}
                alt=""
              />
            </section>
            <section className="flex flex-col justify-center gap-2">
              <h1 className="text-2xl font-semibold">
                {userDetail ? userDetail.fullName : ""}
              </h1>
              <div className="text-[16px] text-zinc-500 pl-1 flex gap-2">
                <p className="text-zinc-100">
                  @{userDetail ? userDetail.username : ""}
                </p>
                <p className="">
                  {userDetail ? userDetail.subscribersCount : "0"} subscribers
                </p>
                <p className="">
                  {userDetail ? userDetail.videosCount : "0"} videos
                </p>
              </div>
              <button
                onClick={handleSubscribe}
                className={`p-[.4rem] w-fit px-6 rounded-full text-sm font-semibold bg-[#ff0000] hover:text-white `}
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
        <section className="my-5">
          <h1 className="my-2 text-xl">Created Playlist</h1>
          <main className="flex gap-5">
            <section className="flex flex-col gap-2">
              <div className="w-[20rem] h-[12rem] border rounded-xl overflow-hidden">
                <img src="" alt="" />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-sm">Playlist Name</h1>
                <p className="text-sm text-zinc-500">Playlist subscribers</p>
              </div>
            </section>

            <section className="flex flex-col gap-2">
              <div className="w-[20rem] h-[12rem] border rounded-xl overflow-hidden">
                <img src="" alt="" />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-sm">Playlist Name</h1>
                <p className="text-sm text-zinc-500">Playlist subscribers</p>
              </div>
            </section>
          </main>
        </section>
      </main>
    </div>
  );
}

export default UserChannel;
