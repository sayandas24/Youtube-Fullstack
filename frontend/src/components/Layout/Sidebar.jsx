import React, { useContext, useEffect, useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { MdHistory } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { CollapseContext } from "../../contexts/collapseMenu/CollapseContext";
import { NavLink } from "react-router";
import { FeatureSoonContext } from "../../contexts/featureSoonContext/UseFeatureSoon";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import "../../responsive/sidebar.scss";
// TODO:Light mode fix

function Sidebar() {
  const { collapse } = useContext(CollapseContext);
  const { handleFeatureSoonShow } = useContext(FeatureSoonContext);

  return (
    <div
      id="sidebar"
      className={`${
        collapse ? "w-[6rem] " : ""
      }  w-[18rem] h-full bg-[#0f0f0f] text-white  gap-1 flex flex-col dark:bg-[#f8fafd] dark:text-black`}
    >
      <section
        id="sidebar"
        className={`${
          collapse ? "w-[6rem] " : ""
        } w-[18rem] h-full dark:bg-[#f8fafd] dark:text-black bg-[#0f0f0f] text-white  gap-1 flex flex-col fixed`}
      >
        <NavLink
          to="/"
          className={({ isActive }) => `${
            isActive
              ? "fill-white  bg-[#2c2c2c] dark:bg-[#d3e3fd] dark:fill-black"
              : "dark:hover:bg-[#c0c8d39f]"
          } 
        ${
          collapse
            ? "flex-col items-center gap-[1px] bg-transparent rounded-full"
            : "rounded-r-full"
        } flex gap-5 p-3 px-5 hover:bg-[#2c2c2c]  duration-75   cursor-pointer `}
        >
          <GrHomeRounded className="text-2xl fill-inherit dark:fill-transparent" />

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
          onClick={() => handleFeatureSoonShow("Shorts we'll be adding soon")}
          className={({ isActive }) =>
            `${
              !isActive
                ? "fill-whiteX bg-[#2c2c2c]X  "
                : "fill-transparent stroke-transparent "
            } 
          ${
            collapse
              ? "  flex-col items-center gap-[1px] bg-transparent rounded-full"
              : "rounded-r-full"
          } 

          flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer  dark:hover:bg-[#c0c8d39f]`
          }
        >
          <div className="">
            <SiYoutubeshorts className="  text-2xl dark:stroke-black dark:!fill-transparent  stroke-white stroke-[2] !fill-inherit " />
          </div>
          <div
            className={`${
              collapse ? "!text-[.77rem]" : ""
            } text-[1.1rem] font-[420] `}
          >
            Shorts
          </div>
        </NavLink>
        {!collapse && <hr className="border-zinc-600 my-1" />}
        <NavLink
          to="/user/history"
          // onClick={() => handleFeatureSoonShow("History working on it")}
          className={({ isActive }) =>
            `${
              isActive
                ? "fill-white bg-[#2c2c2c] dark:bg-[#d3e3fd] dark:fill-black"
                : "dark:hover:bg-[#c0c8d39f]"
            } ${
              collapse
                ? "  flex-col items-center gap-[1px] bg-transparent rounded-full"
                : "rounded-r-full"
            } flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer `
          }
        >
          <div className="">
            <MdHistory className="text-2xl " />
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
          onClick={() =>
            handleFeatureSoonShow("Playlist feature not added yet")
          }
          className={({ isActive }) =>
            `${!isActive ? "fill-whiteX bg-[#2c2c2c]X " : ""} ${
              collapse
                ? "flex-col items-center gap-[1px] bg-transparent rounded-full"
                : "rounded-r-full"
            }   flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer  dark:hover:bg-[#c0c8d39f]`
          }
        >
          <div className="">
            <MdOutlineSubscriptions className="text-2xl " />
          </div>
          <div
            className={`${
              collapse ? "!text-[.77rem]" : ""
            } text-[1.1rem] font-[420] `}
          >
            Playlist
          </div>
        </NavLink>
        {!collapse && <hr className="border-zinc-600 my-1" />}
        <NavLink
          to="/"
          onClick={() => handleFeatureSoonShow("Feature coming soon")}
          className={({ isActive }) =>
            `${!isActive ? "fill-whiteX bg-[#2c2c2c]X" : ""} ${
              collapse
                ? "flex-col items-center gap-[1px] bg-transparent rounded-full"
                : "rounded-r-full"
            }   flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer  dark:hover:bg-[#c0c8d39f]`
          }
        >
          <div className="">
            <IoSettingsOutline className="text-2xl " />
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
            `${
              isActive
                ? "fill-white bg-[#2c2c2c] dark:bg-[#d3e3fd] dark:fill-black"
                : ""
            } ${
              collapse
                ? "flex-col items-center gap-[1px] bg-transparent rounded-full"
                : "rounded-r-full"
            }   flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer  dark:hover:bg-[#c0c8d39f]`
          }
        >
          <div className="">
            <CgProfile className="text-2xl " />
          </div>
          <div
            className={`${
              collapse ? "!text-[.77rem]" : ""
            } text-[1.1rem] font-[420] `}
          >
            Profile
          </div>
        </NavLink>
      </section>
    </div>
  );
}

export default Sidebar;
