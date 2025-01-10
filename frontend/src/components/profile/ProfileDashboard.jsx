import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ProfileDashboardDP from "./profileDashboard/ProfileDashboardDP";
import ProfileDashboardCover from "./profileDashboard/ProfileDashboardCover";
import timeSince from "../../utils/timeSince";
import { Link } from "react-router";

function ProfileDashboard({ user }) {
  console.log(user);

  return (
    <div className="flex w-full text-white">
      {/* <Sidebar /> */}

      <main className="flex flex-col w-[85rem] mx-auto">
        {/* banner */}
        <ProfileDashboardCover user={user} />
        {/* profile */}
        <ProfileDashboardDP user={user} />
        {/* playlists header*/}
        <section className=" w-full">
          <div className="flex gap-5 text-xl font-semibold">
            <h1 className="border-b-2 rounded-[5px] pb-2">Playlists</h1>
            <h1 className="pb-2">
              <SearchIcon className="!text-3xl text-zinc-500" />
            </h1>
          </div>
          <hr className="border-t border-zinc-600" />
        </section>

        {/* playlists */}
        <section className="my-5">
          <h1 className="my-2 text-xl">Created Playlist</h1>
          <main className="flex gap-4">
            {user &&
              user.videos.map((video) => (

                <Link to={`/p/${video._id}`} key={video._id} className=" p-3 rounded-xl hover:shadow-[0px_3px_5px_3px_#2e2e2e] w-[15.5rem]">
                  <div className="w-[14rem] h-[8.5rem] rounded-xl overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={video.thumbnail}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-[15px] mt-1 line-clamp-1">{video.title}</h1>
                    <p className="text-[15px] text-zinc-500 line-clamp-1">
                      {video.viewsCount} views . uploaded {timeSince(video.createdAt)}
                    </p>
                  </div>
                </Link>
              ))}
          </main>
        </section>
      </main>
    </div>
  );
}

export default ProfileDashboard;
