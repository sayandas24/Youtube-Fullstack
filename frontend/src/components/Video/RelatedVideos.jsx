import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Link, NavLink, useNavigate } from "react-router";
import RelatedVideoSkeleton from "../UI/skeleton/RelatedVideoSkeleton";
import NProgress from "nprogress";
import timeSince from "../../utils/timeSince";
// import "nprogress/nprogress.css"; // Default styles

function RelatedVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Start the progress bar when loading videos
    NProgress.start();

    axiosInstance
      .get("video/")
      .then((res) => {
        setVideos(res.data.message);
        setLoading(false);
        NProgress.done(); // Finish the progress bar after loading videos
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        NProgress.done(); // Finish the progress bar on error
      });
  }, []);

  const handleNavigation = (path, videoId) => {
    NProgress.start(); // Start progress bar
    axiosInstance
      .get(`/view/video/${videoId}`)
      .then((res) => {
        setVideos((prevVideos) =>
          prevVideos.map((video) =>
            video._id === videoId
              ? { ...video, viewsCount: video.viewsCount + 1 }
              : video
          )
        );
        NProgress.done(); // Complete progress bar after navigation
      })
      .catch((err) => {
        console.error(err);
        NProgress.done(); // Complete progress bar on error
      });
    navigate(path); // Perform navigation
  };

  return (
    <section
      className={`${
        loading ? "!overflow-hidden" : ""
      } w-[28rem] rounded-2xl flex text-white flex-col gap-3`}
    >
      {loading && <RelatedVideoSkeleton number={8} />}
      {videos.map((video) => (
        <div key={video._id} className="flex  gap-2 w-full">
          {/* thumbnail */}
          <section
            onClick={() => handleNavigation(`/p/${video._id}`, video._id)}
          >
            <div className="w-[13rem] h-[8rem] cursor-pointer border-zinc-600 rounded-2xl overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={video.thumbnail}
                alt=""
              />
            </div>
          </section>

          {/* thumbnail details */}
          <div className="flex flex-col py-2 gap-1 w-[25rem]">
            <h1 className="text-[1.2rem] font-semibold text-wrap">
              {video.title}
            </h1>

            <div className="flex flex-col text-zinc-400 text-[1rem]">
              <Link
                to={`/channel/${video.owner.username}`}
                className="text-zinc-300 hover:text-zinc-100"
              >
                {video.owner.fullName}
              </Link>
              <div className="flex gap-2 items-center">
                <span>{video.viewsCount} views</span>
                <span>{timeSince(video.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default RelatedVideos;
