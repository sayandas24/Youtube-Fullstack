import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ProfileDashboardDP from "./profileDashboard/ProfileDashboardDP";
import ProfileDashboardCover from "./profileDashboard/ProfileDashboardCover";
import timeSince from "../../utils/timeSince";
import { Link, NavLink } from "react-router";
import Tweets from "./Tweets";
import { GoPlusCircle } from "react-icons/go";


function ProfileDashboard({ user }) {
  const [showPlaylists, setShowPlaylists] = useState(true);
  const [showTweets, setShowTweets] = useState(false);

  const handlePlaylistClick = () => {
    setShowPlaylists(true);
    setShowTweets(false);
  };

  const handleTweetsClick = () => {
    setShowPlaylists(false);
    setShowTweets(true);
  };
  

  return (
    <div className="flex w-full text-white min-[1000px]:pl-2">
      {/* <Sidebar /> */}

      <main className="flex flex-col w-[85rem] mx-auto max-[1000px]:px-2">
        {/* banner */}
        <ProfileDashboardCover user={user} />
        {/* profile */}
        <ProfileDashboardDP user={user} />
        {/* playlists header*/}
        <div className="flex gap-5 text-xl font-semibold pl-2">
          <h1
            onClick={handlePlaylistClick}
            className={`${
              showPlaylists ? "border-b-2 border-[#acacac]" : "text-zinc-400"
            } pb-2 cursor-pointer`}
          >
            Playlists
          </h1>
          <h1
            onClick={handleTweetsClick}
            className={`${
              showTweets ? "border-b-2 border-[#acacac]" : "text-zinc-400"
            } pb-2 cursor-pointer`}
          >
            Tweets
          </h1>
          {/* <SearchIcon className="!text-3xl text-zinc-500" /> */}
        </div>

        {/* playlists */}
        {showPlaylists && (
          <section className="my-5">
            {user?.videos?.length == 0 ? (
              <div className="flex justify-center items-center py-5 flex-col">
                <h1 className="text-2xl font-semibold">No video posted</h1>
                <NavLink
                  to={`/upload/`}
                  className="flex gap-2 items-center mt-10 cursor-pointer animate-pulse"
                >
                  <GoPlusCircle className="text-xl  " />
                  <h1 className="">Post a video</h1>
                </NavLink>
              </div>
            ) : (
              <h1 className="my-2 text-xl">Created Playlist</h1>
            )}

            <main
              id="video-in-dashboard"
              className=" flex-wrap max-[1000px]:mb-[3rem]"
            >
              {user &&
                user?.videos?.map((video) => (
                  <Link
                    to={`/p/${video._id}`}
                    key={video._id}
                    className=" p-3 rounded-xl hover:shadow-[0px_3px_5px_3px_#2e2e2e] w-full "
                  >
                    <div
                      id="each-video-in-dashboard"
                      className="w-full h-[15rem] rounded-xl overflow-hidden"
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={video.thumbnail}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-[15px] mt-1 line-clamp-1">
                        {video.title}
                      </h1>
                      <p className="text-[15px] text-zinc-500 line-clamp-1">
                        {video.viewsCount} views . uploaded{" "}
                        {timeSince(video.createdAt)}
                      </p>
                    </div>
                  </Link>
                ))}
            </main>
          </section>
        )}

        {/* tweets */}
        {showTweets && <Tweets userDetail={user} currUser={user} />}
      </main>
    </div>
  );
}

export default ProfileDashboard;
