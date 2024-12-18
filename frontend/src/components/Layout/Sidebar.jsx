import React from "react";
import { GrHomeRounded } from "react-icons/gr";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { BiLike } from "react-icons/bi";


function Sidebar() {
  return (
    <div className="w-[18rem] h-screen  text-white  px-5 gap-1 flex flex-col">
      <section className="flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl">
        <div className="">
          <GrHomeRounded className="text-2xl"/>
        </div>
        <div className="text-[1.2rem] font-[420] ">
          Home
        </div>
      </section>
      <section className="flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl">
        <div className="">
          <SiYoutubeshorts className="text-2xl"/>
        </div>
        <div className="text-[1.2rem] font-[420] ">
          Shorts
        </div>
      </section>
      <section className="flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl">
        <div className="">
          <MdHistory className="text-2xl"/>
        </div>
        <div className="text-[1.2rem] font-[420] ">
          History
        </div>
      </section>
      <hr className="border-zinc-600 my-1"/>
      <section className="flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl">
        <div className="">
          <MdOutlineSubscriptions className="text-2xl"/>
        </div>
        <div className="text-[1.2rem] font-[420] ">
          Playlist
        </div>
      </section>
     
      <section className="flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl">
        <div className="">
          <MdOutlineWatchLater className="text-2xl"/>
        </div>
        <div className="text-[1.2rem] font-[420] ">
          Watch later
        </div>
      </section>
      <section className="flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl">
        <div className="">
          <BiLike className="text-2xl"/>
        </div>
        <div className="text-[1.2rem] font-[420] ">
          Liked videos
        </div>
      </section> 

    </div>
  );
}

export default Sidebar;
