import React, { useState } from "react";  
import SearchIcon from "@mui/icons-material/Search"; 
import ProfileDashboardDP from "./profileDashboard/ProfileDashboardDP";
import ProfileDashboardCover from "./profileDashboard/ProfileDashboardCover";

function ProfileDashboard({ user }) {
 

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
          <main className="flex gap-5">
            <div className="w-[14rem] h-[8.5rem] border rounded-xl overflow-hidden">
              <img src="" alt="" />
            </div>
            <div className="w-[14rem] h-[8.5rem] border rounded-xl overflow-hidden">
              <img src="" alt="" />
            </div>
            <div className="w-[14rem] h-[8.5rem] border rounded-xl overflow-hidden">
              <img src="" alt="" />
            </div>
          </main>
        </section>
      </main>
    </div>
  );
}

export default ProfileDashboard;
