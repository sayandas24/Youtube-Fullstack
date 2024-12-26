import React, { useContext, useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { CollapseContext } from "../../contexts/collapseMenu/CollapseContext";
import { NavLink, useNavigate } from "react-router";
import { FeatureSoonContext } from "../../contexts/featureSoonContext/UseFeatureSoon";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

function Sidebar() {
  const { collapse } = useContext(CollapseContext); 
  const { featureSoonShow, handleFeatureSoonShow} = useContext(FeatureSoonContext)

  return (
    <div
      className={`${
        collapse ? "w-[6rem]" : ""
      } w-[18rem] h-full bg-[#0f0f0f] text-white  px-2 gap-1 flex flex-col`}
    >
      <NavLink
        to="/"
        className={({ isActive }) => `${
          isActive ? "fill-white bg-[#2c2c2c]" : ""
        } 
        ${
          collapse ? "flex-col items-center gap-[1px] bg-transparent" : ""
        } flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75   cursor-pointer rounded-xl`}
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
        to="/"
        onClick={handleFeatureSoonShow}
        className={({ isActive }) =>
          `${
            !isActive
              ? "fill-white bg-[#2c2c2c]  "
              : "fill-transparent stroke-transparent "
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
        to="/"
        onClick={handleFeatureSoonShow}
        className={({ isActive }) =>
          `${!isActive ? "fill-white bg-[#2c2c2c]" : ""} ${
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
        to="/"
        onClick={handleFeatureSoonShow}
        className={({ isActive }) =>
          `${!isActive ? "fill-white bg-[#2c2c2c]" : ""} ${
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
        to="/"
        onClick={handleFeatureSoonShow}
        className={({ isActive }) =>
          `${!isActive ? "fill-white bg-[#2c2c2c]" : ""} ${
            collapse ? "flex-col items-center gap-[1px] bg-transparent" : ""
          } flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`
        }
      >
        <div className="">
          <IoSettingsOutline className="text-2xl" />
        </div>
        <div
          className={`${
            collapse ? "!text-[.77rem]" : ""
          } text-[1.1rem] font-[420] `}
        >
          Settings
        </div>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `${isActive ? "fill-white bg-[#2c2c2c]" : ""} ${
            collapse ? "flex-col items-center gap-[1px] bg-transparent" : ""
          } flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`
        }
      >
        <div className="">
          <CgProfile className="text-2xl" />
        </div>
        <div
          className={`${
            collapse ? "!text-[.77rem]" : ""
          } text-[1.1rem] font-[420] `}
        >
          Profile
        </div>
      </NavLink>
    </div>
  );
}

export default Sidebar;
