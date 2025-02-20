import React, { useContext, useEffect, useState } from "react";
import Comments from "./Comments";
import RelatedVideos from "./RelatedVideos";
import { RiShareForwardLine } from "react-icons/ri";
import { LiaDownloadSolid } from "react-icons/lia";
import VideoPlayer from "./VideoPlayer";
import axiosInstance from "../../utils/axiosInstance";
import { useParams, useLocation, Link } from "react-router";
import Sidebar2 from "../Layout/Sidebar2";
import { CollapseContext } from "../../contexts/collapseMenu/CollapseContext";
import { BsThreeDots } from "react-icons/bs";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import timeSince from "../../utils/timeSince";
import { FeatureSoonContext } from "../../contexts/featureSoonContext/UseFeatureSoon";
import LoginErrorWarn from "../../utils/LoginErrorWarn";
import { BsFacebook } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { ConfettiButton } from "@/components/magicui/confetti";

function Video() {
  const [getVideo, setGetVideo] = useState({});
  const [viewsCount, setViewsCount] = useState(0); // Add state for views count
  const [currUser, setCurrUser] = useState({});

  const { videoId } = useParams();
  const location = useLocation();
  const isRouteActive = location.pathname.startsWith(`/p/`);
  const isHomeRoute = location.pathname === `/`;

  const { collapse2, setCollapse2 } = useContext(CollapseContext);
  const { setIsLoginUser } = useContext(FeatureSoonContext);

  console.log(currUser);
  // is the class is true then add some class in sidebar,,,
  useEffect(() => {
    setCollapse2(true);

    axiosInstance
      .get("/user/current-user")
      .then((res) => {
        setCurrUser(res.data.data);
      })
      .catch((err) => {
        console.log("not logged in in video", err);
      });
  }, []);

  // fetch the video
  useEffect(() => {
    axiosInstance.get(`/video/p/${videoId}`).then((res) => {
      setGetVideo(res.data.message);
      setViewsCount(res.data.message.viewsCount); // Set initial views count
    });
    axiosInstance
      .get(`/view/video/${videoId}`)
      .then((res) => {
        console.log(res, "in views");
        setGetVideo((prev) => ({
          ...prev,
          viewsCount: prev.viewsCount + 1,
        }));
        setViewsCount((prev) => prev + 1); // Update views count state
      })
      .catch((err) => {
        console.log(err);
      });
  }, [videoId]);

  // Function to handle subscription
  const handleSubscribe = () => {
    axiosInstance
      .get("/user/current-user")
      .then((res) => {
        setIsLoginUser(true);
      })
      .catch((err) => {
        setIsLoginUser(false);
      });
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
    axiosInstance
      .get("/user/current-user")
      .then((res) => {
        setIsLoginUser(true);
      })
      .catch((err) => {
        setIsLoginUser(false);
      });
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
    <div className=" py-10 flex relative dark:bg-[#f1f3fa]">
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
        } flex gap-5 transition-all duration-150 w-full max-[1000px]:flex-col overflow-x-hidden `}
      >
        {/* left video */}
        <section className="w-[70%] max-[1000px]:w-full dark:text-black text-white flex flex-col gap-3  pl-5 max-[1000px]:p-5 max-[700px]:p-0">
          {/* video player, channel details */}
          <div className="flex flex-col gap-3">
            {/* video player */}
            <VideoPlayer getVideo={getVideo} />
            {/* video title */}
            <section className="text-[1.2rem] leading-[1.4rem] max-[700px]:p-2 max-[500px]:text-[1.1rem]">
              {getVideo?.title} | {getVideo.ownerDetails?.fullName}
            </section>
            {/* channel details, subs */}
            <section className="flex min-[700px]:items-center max-[700px]:flex-col max-[700px]:p-2">
              {/* Avatar */}
              <div className="flex gap-2 items-center">
                <Link
                  to={`/channel/${getVideo?.ownerDetails?.username}`}
                  className="w-[2.4rem] "
                >
                  <div className="w-[2.4rem] h-[2.4rem] overflow-hidden rounded-full">
                    <img
                      className="w-full h-full object-cover"
                      src={
                        getVideo.ownerDetails
                          ? getVideo.ownerDetails.avatar
                          : ""
                      }
                      alt="avatar"
                    />
                  </div>
                </Link>
                {/* Avatar name, description */}
                <div className="flex flex-col text-white text-nowrap">
                  <Link
                    to={`/channel/${getVideo?.ownerDetails?.username}`}
                    className="text-[1.2rem] max-[500px]:text-[.9rem] dark:text-black"
                  >
                    {getVideo.ownerDetails
                      ? getVideo.ownerDetails.fullName
                      : "N/A"}
                  </Link>
                  <p className="text-[.8rem] text-zinc-500 max-[500px]:text-[.7rem]">
                    {getVideo ? getVideo.subscribersCount : 0} Subscribers
                  </p>
                </div>
                {/* Subscribe and other buttons */}
                <button
                  onClick={handleSubscribe}
                  className={`${
                    getVideo.isSubscribed
                      ? "dark:!bg-[#d7dee8] dark:text-black"
                      : "!bg-white dark:!bg-[#eb0b0b] dark:!text-white hover:!bg-[#d6d6d6] !text-black"
                  }  p-[.4rem] px-5 basicButton1 border-none rounded-full text-sm font-[500] max-[500px]:text-[.8rem]`}
                >
                  {getVideo.isSubscribed ? (
                    "Unsubscribe"
                  ) : (
                    <div>
                      {currUser._id ? (
                        <ConfettiButton>Subscribe</ConfettiButton>
                      ) : (
                        "Subscribe"
                      )}
                    </div>
                  )}
                </button>
              </div>

              {/* like, share, download */}
              <div className="flex gap-2 min-[700px]:ml-auto max-[700px]:mt-3 overflow-auto scrollbar-hide">
                <button
                  onClick={() => handleLikeVideo(getVideo._id)}
                  className="p-[.3rem] dark:!bg-[#d7dee8] dark:text-black border-none basicButton1 px-5 flex gap-1 items-center  rounded-full text-sm "
                >
                  {getVideo.isLiked ? (
                    <ThumbUpIcon className="text-xl max-[500px]:!text-lg " />
                  ) : (
                    <ThumbUpOutlinedIcon className="text-xl max-[500px]:!text-lg" />
                  )}
                  <span className="like text-lg  w-3 max-[500px]:text-[13px]">
                    {getVideo.videoLikes}
                  </span>
                  <span className="max-[500px]:text-[13px]">likes</span>
                </button>
                <button className="p-[.4rem] basicButton1 dark:!bg-[#d7dee8] dark:text-black border-none px-5 rounded-full text-sm  flex items-center gap-2 flex-nowrap">
                  <RiShareForwardLine className="text-xl max-[500px]:text-lg" />{" "}
                  <span className="max-[500px]:text-[13px]">share</span>
                </button>
                <button className="p-[.4rem] dark:!bg-[#d7dee8] dark:text-black border-none basicButton1 px-5  rounded-full text-sm   flex items-center gap-2 flex-nowrap">
                  <LiaDownloadSolid className="text-xl max-[500px]:text-lg" />{" "}
                  <span className="max-[500px]:text-[13px]">download</span>
                </button>
                <button className="p-[.4rem] dark:!bg-[#d7dee8] dark:text-black border-none basicButton1 px-5  rounded-full text-sm  flex items-center gap-2 flex-nowrap">
                  <BsThreeDots className="text-xl max-[500px]:text-lg" />
                </button>
              </div>
            </section>
          </div>
          {/* video description */}
          <div className="max-[500px]:text-[.9rem] flex gap-2 min-[700px]:w-full dark:bg-[#d7dee8]  bg-[#262626]  px-3 py-5 rounded-2xl flex-col max-[700px]:m-2 ">
            {/* video description */}
            <div>
              <h1>
                {viewsCount} views Posted {timeSince(getVideo.createdAt)}
              </h1>
              <p>{getVideo.description}</p>
            </div>

            {/* channel details, subs */}
            <section className="flex gap-2 items-center mt-[10rem]">
              {/* Avatar */}
              <Link
                to={`/channel/${getVideo?.ownerDetails?.username}`}
                className="w-[2.4rem] "
              >
                <div className="w-[2.4rem] h-[2.4rem] overflow-hidden rounded-full">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      getVideo.ownerDetails ? getVideo.ownerDetails.avatar : ""
                    }
                    alt="avatar"
                  />
                </div>
              </Link>
              {/* Avatar name, description */}
              <div className="flex flex-col text-white text-nowrap">
                <Link
                  to={`/channel/${getVideo?.ownerDetails?.username}`}
                  className="text-[1.2rem] max-[500px]:text-[.9rem] dark:text-black"
                >
                  {getVideo.ownerDetails
                    ? getVideo.ownerDetails.fullName
                    : "N/A"}
                </Link>
                <p className="text-[.8rem] text-zinc-500 max-[500px]:text-[.7rem]">
                  {getVideo ? getVideo.subscribersCount : 0} Subscribers
                </p>
              </div>
            </section>

            {/* social media handles */}
            <section className="flex gap-2 flex-wrap">
              <button className="max-[500px]:py-1 max-[500px]:px-3 p-[.4rem] px-5 border border-zinc-600 dark:border-zinc-400 rounded-full text-sm  flex  items-center gap-2 flex-nowrap ">
                <BsFacebook className="text-blue-500 text-xl max-[500px]:text-[.9rem]" />
                <span className="max-[500px]:text-[.7rem]">Facebook</span>
              </button>
              <Link
                to={"https://www.instagram.com/im_sayan22"}
                className="max-[500px]:py-1 max-[500px]:px-3 p-[.4rem] px-5 border border-zinc-600 dark:border-zinc-400 rounded-full text-sm  flex  items-center gap-2 flex-nowrap "
              >
                <FaInstagram className="text-red-500 text-xl max-[500px]:text-[.9rem]" />{" "}
                <span className="max-[500px]:text-[.7rem]">Instagram</span>
              </Link>
              <button className="max-[500px]:py-1 max-[500px]:px-3 p-[.4rem] px-5 border border-zinc-600 dark:border-zinc-400 rounded-full text-sm  flex  items-center gap-2 flex-nowrap ">
                <FaSquareXTwitter className="text-xl max-[500px]:text-[.9rem]" />{" "}
                <span className="max-[500px]:text-[.7rem]">Twitter</span>
              </button>
            </section>
          </div>

          {/* comments */}
          <div className="max-[700px]:p-2">
            <Comments getVideo={getVideo} />
          </div>
        </section>

        {/* right other videos */}
        <section className=" w-[25rem] max-[1000px]:w-full">
          <h1 className="my-2 text-lg ml-2 text-white min-[1000px]:hidden">
            Related videos
          </h1>
          <RelatedVideos />
        </section>
      </main>
      <LoginErrorWarn />
    </div>
  );
}

export default Video;
