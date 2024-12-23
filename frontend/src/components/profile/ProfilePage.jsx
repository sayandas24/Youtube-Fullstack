import React, { useState } from "react"; 
import Profile from "./Profile"; 
import ProfileHeader from "./ProfileHeader";
import { NavLink } from "react-router";

function ProfilePage() {
  const [haveVideo, setHaveVideo] = useState(false);
  return (
    <main className="flex gap-2 w-full h-[90vh] text-white bg-gradient-to-b from-[#0f0f0f] to-[#1b1b1b] border-t border-[#434343]">
      {/* left */}
      <div className="w-[18rem] mt-5">
        <Profile />
      </div>
      {/* right */}
      <section className="w-[100%] border-l border-[#434343]">
        <ProfileHeader />
        {haveVideo && (
          <h1 className=" text-zinc-400 p-10">You have no video posted</h1>
        )}

        <div className="border-b border-[#434343] w-full h-[5.5rem] p-2 px-5 flex items-center">
          <div className="border border-[#434343] rounded-lg w-[7.5rem] h-full"></div>
          <NavLink to="#" className="ml-auto p-[.5rem] px-3 hover:bg-[#3e3e3e] bg-[#272727] rounded-full font-[500] text-[.8rem]">
            Edit Video
          </NavLink>
        </div>


      </section>
    </main>
  );
}

export default ProfilePage;
