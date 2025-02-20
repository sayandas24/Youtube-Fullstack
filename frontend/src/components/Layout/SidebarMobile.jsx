import React, { useContext, useEffect, useState } from "react";
import { GrHomeRounded } from "react-icons/gr"; 
import { MdHistory } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md"; 
import { NavLink } from "react-router";
import { FeatureSoonContext } from "../../contexts/featureSoonContext/UseFeatureSoon";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import axiosInstance from "../../utils/axiosInstance";

function SidebarMobile() {
  const { handleFeatureSoonShow } = useContext(FeatureSoonContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    axiosInstance
      .get("/user/current-user")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log("User not login");
      });
  }, []);  

  return (
    <section
      id="sidebar"
      className={` w-full h-fit  bg-[#0f0f0f] text-white  px-2 gap-1 flex flex-row fixed min-[500px]:hidden bottom-0 left-0`}
    >
      <NavLink
        to="/"
        className={({ isActive }) => `${
          isActive ? "fill-white bg-[#2c2c2c]X" : ""
        } 
         small-icon-navlink flex hover:bg-[#2c2c2c] duration-75   cursor-pointer rounded-xl`}
      >
        <GrHomeRounded className="text-2xl fill-inherit smallIcon-nav" />

        <div className={` text-[1.1rem] font-[420] small-text-in-small `}>
          Home
        </div>
      </NavLink>

      <NavLink
        to="/"
        onClick={() => handleFeatureSoonShow("Shorts w'll be added soon")}
        className={({ isActive }) =>
          `${
            !isActive
              ? "fill-whiteX bg-[#2c2c2c]X  "
              : "fill-transparent stroke-transparent "
          }  

          small-icon-navlink flex hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`
        }
      >
        <div className="">
          <SiYoutubeshorts className=" smallIcon-nav text-2xl stroke-white stroke-[2] !fill-inherit " />
        </div>
        <div className={` text-[1.1rem] font-[420] small-text-in-small `}>
          Shorts
        </div>
      </NavLink>
      <NavLink
        to="/user/history"
        // onClick={() => handleFeatureSoonShow("History working on it")}
        className={({ isActive }) =>
          `${
            isActive ? "fill-white bg-[#2c2c2c]" : ""
          } small-icon-navlink flex hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`
        }
      >
        <div className="">
          <MdHistory className="text-2xl smallIcon-nav" />
        </div>
        <div className={` text-[1.1rem] font-[420] small-text-in-small `}>
          History
        </div>
      </NavLink>

      <NavLink
        to="/"
        onClick={() => handleFeatureSoonShow("Playlist feature not added yet")}
        className={({ isActive }) =>
          `${
            !isActive ? "fill-whiteX bg-[#2c2c2c]X" : ""
          } small-icon-navlink small-icon-navlink  flex hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`
        }
      >
        <div className="">
          <MdOutlineSubscriptions className="text-2xl smallIcon-nav" />
        </div>
        <div className={` text-[1.1rem] font-[420] small-text-in-small `}>
          Playlist
        </div>
      </NavLink>
      <NavLink
        to="/"
        onClick={() => handleFeatureSoonShow("Feature coming soon")}
        className={({ isActive }) =>
          `${
            !isActive ? "fill-whiteX bg-[#2c2c2c]X" : ""
          } small-icon-navlink small-icon-navlink  flex hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`
        }
      >
        <div className="">
          <IoSettingsOutline className="text-2xl smallIcon-nav" />
        </div>
        <div className={`  text-[1.1rem] font-[420] small-text-in-small `}>
          Settings
        </div>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `${
            isActive ? "fill-white bg-[#2c2c2c]X" : ""
          } small-icon-navlink  flex  hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`
        }
      >
        {user.username ? (
          <div className="w-[1.8rem] h-[1.8rem] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={user ? user?.avatar : ""}
              alt=""
            />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="">
              <CgProfile className="text-2xl smallIcon-nav" />
            </div>
            <div className={` text-[1.1rem] font-[420] small-text-in-small `}>
              Profile
            </div>
          </div>
        )}
      </NavLink>
    </section>
  );
}

export default SidebarMobile;
