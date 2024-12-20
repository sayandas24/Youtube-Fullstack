import React, { useContext, useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { CollapseContext } from "../../contexts/collapseMenu/CollapseContext";
import { NavLink } from "react-router";

function Sidebar() {
  const { collapse } = useContext(CollapseContext);

  return (
    <div
      className={`${
        collapse ? "w-[6rem]" : ""
      } w-[18rem] h-screen bg-[#0f0f0f] text-white  px-2 gap-1 flex flex-col`}
    >
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${isActive ? "fill-white bg-[#2c2c2c]" : ""} ${
            collapse ? "flex-col items-center gap-[1px] bg-transparent" : ""
          } flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`
        }
      >
        <GrHomeRounded className="text-2xl fill-inherit" />

        <div
          className={`${
            collapse ? "!text-[.77rem]" : ""
          } text-[1.1rem] font-[420] `}
        >
          Home
        </div>
      </NavLink>

      <NavLink
        to="/shorts"
        className={({ isActive }) =>
          `${
            isActive
              ? "fill-white bg-[#2c2c2c]  "
              : "fill-transparent stroke-transparent"
          } 
          ${collapse ? "flex-col items-center gap-[1px] bg-transparent" : ""} 

          flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`
        }
      >
        <div className="">
          <SiYoutubeshorts className="text-2xl stroke-white stroke-[2] !fill-inherit h-[30px]" />
        </div>
        <div
          className={`${
            collapse ? "!text-[.77rem]" : ""
          } text-[1.1rem] font-[420] `}
        >
          Shorts
        </div>
      </NavLink>

      <NavLink
        to="/history"
        className={({ isActive }) =>
          `${isActive ? "fill-white bg-[#2c2c2c]" : ""} ${
            collapse ? "flex-col items-center gap-[1px] bg-transparent" : ""
          } flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`
        }
      >
        <div className="">
          <MdHistory className="text-2xl" />
        </div>
        <div
          className={`${
            collapse ? "!text-[.77rem]" : ""
          } text-[1.1rem] font-[420] `}
        >
          History
        </div>
      </NavLink>

      <NavLink
        to="/playlist"
        className={({ isActive }) =>
          `${isActive ? "fill-white bg-[#2c2c2c]" : ""} ${
            collapse ? "flex-col items-center gap-[1px] bg-transparent" : ""
          } flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`
        }
      >
        <div className="">
          <MdOutlineSubscriptions className="text-2xl" />
        </div>
        <div
          className={`${
            collapse ? "!text-[.77rem]" : ""
          } text-[1.1rem] font-[420] `}
        >
          Playlist
        </div>
      </NavLink>

      <NavLink
        to="/later"
        className={({ isActive }) =>
          `${isActive ? "fill-white bg-[#2c2c2c]" : ""} ${
            collapse ? "flex-col items-center gap-[1px] bg-transparent" : ""
          } flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`
        }
      >
        <div className="">
          <MdOutlineWatchLater className="text-2xl" />
        </div>
        <div
          className={`${
            collapse ? "!text-[.77rem]" : ""
          } text-[1.1rem] font-[420] `}
        >
          Later
        </div>
      </NavLink>

      <NavLink
        to="/liked"
        className={({ isActive }) =>
          `${isActive ? "fill-white bg-[#2c2c2c]" : ""} ${
            collapse ? "flex-col items-center gap-[1px] bg-transparent" : ""
          } flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`
        }
      >
        <div className="">
          <BiLike className="text-2xl" />
        </div>
        <div
          className={`${
            collapse ? "!text-[.77rem]" : ""
          } text-[1.1rem] font-[420] `}
        >
          Liked
        </div>
      </NavLink>
    </div>
  );
}

export default Sidebar;
