import React from "react";
import UserChannelSkeleton from "../UI/skeleton/UserChannelSkeleton";
import { Link, NavLink } from "react-router-dom";
import timeSince from "../../utils/timeSince";
import { GoPlusCircle } from "react-icons/go";
import AnimationLoader from "../UI/AnimationLoader";

function Playlists({ userDetail, loading, currUser }) {
   
  return (
    <div>
      {userDetail && userDetail?.videos?.length == 0 ? (
        <div className="flex justify-center items-center  flex-col mt-10">
          <h1 className="text-2xl max-[500px]:text-lg">No video posted</h1>
          {currUser?._id == userDetail?._id && (
            <NavLink
              to={`/upload/`}
              className="flex gap-2 items-center mt-10 cursor-pointer animate-pulse"
            >
              <GoPlusCircle className="text-xl  " />
              <h1 className="">Post a video</h1>
            </NavLink>
          )}
        </div>
      ) : (
        <h1 className="my-2 text-xl ml-2 max-[485px]:mt-5"> All Videos</h1>
      )}

      <section
        id="video-in-dashboard"
        className="flex flex-wrap gap-5 my-5 max-[500px]:mb-[5rem]"
      > 
        {loading ? (
          <UserChannelSkeleton number={4} />
        ) : (
          userDetail.videos &&
          userDetail.videos.map((playlist) => (
            <Link
              to={`/p/${playlist._id}`}
              key={playlist._id}
              className=" p-3 rounded-xl  max-[485px]:flex max-[485px]:hover:shadow-none hover:shadow-[0px_3px_5px_3px_#2e2e2e] w-full max-[485px]:gap-2"
            >
              <div
                id="each-video-in-dashboard"
                className="w-full h-[15rem] rounded-xl overflow-hidden max-[485px]:w-[12rem] max-[485px]:!h-[7rem] flex-shrink-0 max-[365px]:w-[10rem] max-[365px]:!h-[6rem]"
              >
                <img
                  className="w-full h-full object-cover"
                  src={playlist.thumbnail}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-[15px] mt-1 line-clamp-2">
                  {playlist.title}
                </h1>
                <p className="text-[15px] text-zinc-500 line-clamp-1 max-[485px]:flex flex-col">
                  <span>{playlist.totalViews} views</span>{" "}
                  <span className="max-[485px]:hidden">| </span>
                  <span>{timeSince(playlist.createdAt)}</span>
                </p>
              </div>
            </Link>
          ))
        )}
      </section>
    </div>
  );
}

export default Playlists;
