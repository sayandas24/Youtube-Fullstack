import React from "react";
import UserChannelSkeleton from "../UI/skeleton/UserChannelSkeleton";
import { Link } from "react-router-dom";
import timeSince from "../../utils/timeSince";

function Playlists({ userDetail, loading }) {
  return (
    <div>
      <h1 className="my-2 text-xl ml-2">Created Playlist</h1>
      <section id="video-in-dashboard" className="flex flex-wrap gap-5 my-5 max-[500px]:mb-[5rem]">
        {loading ? (
          <UserChannelSkeleton number={4} />
        ) : (
          userDetail.videos &&
          userDetail.videos.map((playlist) => (
            <Link
              to={`/p/${playlist._id}`}
              key={playlist._id}
              className=" p-3 rounded-xl hover:shadow-[0px_3px_5px_3px_#2e2e2e] w-full "
            >
              <div
                id="each-video-in-dashboard"
                className="w-full h-[15rem] rounded-xl overflow-hidden"
              >
                <img
                  className="w-full h-full object-cover"
                  src={playlist.thumbnail}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-[15px] mt-1 line-clamp-1">
                  {playlist.title}
                </h1>
                <p className="text-[15px] text-zinc-500 line-clamp-1">
                  {playlist.viewsCount} views . uploaded{" "}
                  {timeSince(playlist.createdAt)}
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
