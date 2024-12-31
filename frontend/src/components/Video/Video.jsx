import React, { useContext, useEffect, useState } from "react";
import Comments from "./Comments";
import RelatedVideos from "./RelatedVideos";
import { RiShareForwardLine } from "react-icons/ri";
import { LiaDownloadSolid } from "react-icons/lia";
import VideoPlayer from "./VideoPlayer";
import axiosInstance from "../../utils/axiosInstance";
import { useParams, useLocation } from "react-router";
import Sidebar2 from "../Layout/Sidebar2";
import { CollapseContext } from "../../contexts/collapseMenu/CollapseContext";
import { BiLike } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function Video() {
  const [getVideo, setGetVideo] = useState({});

  const { videoId } = useParams();
  const location = useLocation();
  const isRouteActive = location.pathname.startsWith(`/p/`);
  const isHomeRoute = location.pathname === `/`;

  const { collapse2, setCollapse2 } = useContext(CollapseContext);

  // is the class is true then add some class in sidebar,,,
  useEffect(() => {
    setCollapse2(true);
  }, []);

  // fetch the video
  useEffect(() => {
    axiosInstance.get(`/video/p/${videoId}`).then((res) => {
      setGetVideo(res.data.message);
    });
  }, [videoId]);

  // Function to handle subscription
  const handleSubscribe = () => {
    // Check if the user is already subscribed
    if (getVideo.isSubscribed == false) {
      axiosInstance
        .get(`/subscription/subscribe/${getVideo.ownerDetails._id}`)
        .then((res) => {
          // Update the subscriber count in the state
          setGetVideo((prev) => ({
            ...prev,
            subscribersCount: prev.subscribersCount + 1,
            isSubscribed: true,
          }));
        });
    }
    if (getVideo.isSubscribed == true) {
      axiosInstance
        .get(`/subscription/unsubscribe/${getVideo.ownerDetails._id}`)
        .then((res) => {
          // Update the subscriber count in the state
          setGetVideo((prev) => ({
            ...prev,
            subscribersCount: prev.subscribersCount - 1,
            isSubscribed: false,
          }));
        });
    }
  };

  // Function to handle like
  const handleLikeVideo = (videoId) => {
    if (getVideo.isLiked === false) {
      axiosInstance
        .get(`/like/like-video/${videoId}`)
        .then((res) => {
          setGetVideo((prev) => ({
            ...prev,
            videoLikes: prev.videoLikes + 1,
            isLiked: true,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (getVideo.isLiked === true) {
      axiosInstance
        .get(`/like/dislike-video/${videoId}`)
        .then((res) => {
          setGetVideo((prev) => ({
            ...prev,
            videoLikes: prev.videoLikes - 1,
            isLiked: false,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (isHomeRoute) {
    setCollapse2(true);
  }

  return (
    <div className="p-10 py-14 flex relative overflow-x-hidden">
      <div
        className={`${
          isRouteActive && collapse2 ? "-translate-x-[18rem]  " : ""
        } transition-all duration-150 top-[0] left-0 z-[999] fixed sidebar`}
      >
        <Sidebar2 />
      </div>
      <main
        className={`${
          collapse2 ? "" : "opacity-50 blur-[2px]"
        } flex gap-5 transition-all duration-150`}
      >
        {/* left video */}
        <section className="w-[75rem] text-white flex flex-col gap-3">
          {/* video player, channel details */}
          <div className="flex flex-col gap-3">
            {/* video player */}
            <VideoPlayer getVideo={getVideo} />
            {/* video title */}
            <section className="text-[1.2rem] leading-[1.4rem]">
              {getVideo?.title} | {getVideo.ownerDetails?.fullName}
            </section>
            {/* channel details, subs */}
            <section className="flex gap-2 items-center">
              {/* Avatar */}
              <div className="w-[2.4rem]">
                <div className="w-[2.4rem] h-[2.4rem] overflow-hidden rounded-full">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      getVideo.ownerDetails ? getVideo.ownerDetails.avatar : ""
                    }
                    alt="avatar"
                  />
                </div>
              </div>
              {/* Avatar name, description */}
              <div className="flex flex-col text-white text-nowrap">
                <p className="text-[1.2rem]">
                  {getVideo.ownerDetails
                    ? getVideo.ownerDetails.fullName
                    : "N/A"}
                </p>
                <p className="text-[.8rem] text-zinc-500">
                  {getVideo ? getVideo.subscribersCount : 0} Subscribers
                </p>
              </div>
              {/* Subscribe and other buttons */}
              <div className="flex justify-between w-full">
                <button
                  onClick={handleSubscribe}
                  className={`${
                    getVideo.isSubscribed
                      ? ""
                      : "!bg-white hover:!bg-[#d6d6d6] !text-black"
                  }  p-[.4rem] px-5 basicButton1  rounded-full text-sm font-semibold`}
                >
                  {getVideo.isSubscribed ? "Unsubscribe" : "Subscribe"}
                </button>

                <div className="flex gap-2 ">
                  <button
                    onClick={() => handleLikeVideo(getVideo._id)}
                    className="p-[.4rem]  basicButton1 px-5 flex gap-1 items-center  rounded-full text-sm font-semibold"
                  >
                    {getVideo.isLiked ? (
                      <ThumbUpIcon className="text-xl" />
                    ) : (
                      <ThumbUpOutlinedIcon className="text-xl" />
                    )}
                    <span className="like text-lg font-semibold w-5">
                      {getVideo.videoLikes}
                    </span>
                  </button>
                  <button className="p-[.4rem] basicButton1  px-5 rounded-full text-sm font-semibold">
                    <RiShareForwardLine />
                  </button>
                  <button className="p-[.4rem] basicButton1 px-5  rounded-full text-sm font-semibold">
                    <LiaDownloadSolid />
                  </button>
                  <button className="p-[.4rem] basicButton1 px-5  rounded-full text-sm font-semibold">
                    <BsThreeDots />
                  </button>
                </div>
              </div>
            </section>
          </div>
          {/* video description */}
          <div className="flex gap-2 w-full  bg-[#262626]  px-3 py-5 rounded-2xl flex-col">
            {/* video description */}
            <div>
              <h1>
                {getVideo.views} views Posted on{" "}
                {getVideo.createdAt
                  ?.slice(0, 10)
                  .split("-")
                  .reverse()
                  .join("-")}
              </h1>
              <p>{getVideo.description}</p>
            </div>

            {/* channel details, subs */}
            <section className="flex gap-2 items-center mt-[10rem]">
              {/* Avatar */}
              <div className="w-[2.4rem]">
                <div className="w-[2.4rem] h-[2.4rem] overflow-hidden rounded-full">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      getVideo.ownerDetails ? getVideo.ownerDetails.avatar : ""
                    }
                    alt="avatar"
                  />
                </div>
              </div>
              {/* Avatar name, description */}
              <div className="flex flex-col text-white text-nowrap">
                <p className="text-[1.2rem]">
                  {getVideo.ownerDetails
                    ? getVideo.ownerDetails.fullName
                    : "N/A"}
                </p>
                <p className="text-[.8rem] text-zinc-500">
                  {getVideo ? getVideo.subscribersCount : 0} Subscribers
                </p>
              </div>
            </section>

            {/* social media handles */}
            <section className="flex gap-2">
              <button className="p-[.4rem] px-5 border border-zinc-600 rounded-full text-sm font-semibold">
                Facebook
              </button>
              <button className="p-[.4rem] px-5 border border-zinc-600 rounded-full text-sm font-semibold">
                Facebook
              </button>
              <button className="p-[.4rem] px-5 border border-zinc-600 rounded-full text-sm font-semibold">
                Facebook
              </button>
            </section>
          </div>

          {/* comments */}
          <Comments getVideo={getVideo} />
        </section>

        {/* right other videos */}
        <RelatedVideos />
      </main>
    </div>
  );
}

export default Video;
