import React, { useContext, useEffect, useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { CollapseContext } from "../../contexts/collapseMenu/CollapseContext";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";


import metube from "../../assets/metube.svg";

import { IoMdMenu } from "react-icons/io";
import { NavLink } from "react-router";
import { FeatureSoonContext } from "../../contexts/featureSoonContext/UseFeatureSoon";

function Sidebar2() {
  const { collapse2, setCollapse2 } = useContext(CollapseContext);
  const { handleFeatureSoonShow } = useContext(FeatureSoonContext)

  const handleMenu = () => {
    setCollapse2(!collapse2);
  };

  // temp
  const handleClickOutsideSidebar = (event) => {
    if (!event.target.closest(".sidebar") && !event.target.closest(".more-options")) {
      setCollapse2(true);
      console.log("clicked outside")
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutsideSidebar);

    return () => {
      document.removeEventListener("click", handleClickOutsideSidebar);
    };
  }, [])
  

  return (
    <div
      className={`w-[18rem] h-screen bg-[#0f0f0f] text-white py-5 px-2 gap-1 flex flex-col`}
    >
      <NavLink className="ml-3 cursor-pointer">
        <div className="flex gap-3 items-center">
          <IoMdMenu
            onClick={handleMenu}
            className="text-[2.6rem] hover:bg-[#252525] duration-75 cursor-pointer active:bg-[#343434] rounded-full p-2"
          />
          <div className="flex items-center border-[#555555] p-5 rounded-full py-2">
            <img className="w-[2rem] invert" src={metube} alt="" />
            <h1 className="font-sacramento font-bold text-[1.5rem]">Metube</h1>
          </div>
        </div>
      </NavLink>

      <NavLink to="/">
        <section
          className={`flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`}
        >
          <div className="">
            <GrHomeRounded className="text-2xl" />
          </div>
          <div className={` text-[1.1rem] font-[420] `}>Home</div>
        </section>
      </NavLink>

      <section
        onClick={handleFeatureSoonShow}
        className={`flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`}
      >
        <div className="">
          <SiYoutubeshorts className="text-2xl stroke-white stroke-[2] !fill-transparent h-[30px] " />
        </div>
        <div className={`text-[1.1rem] `}>Shorts</div>
      </section>

      <hr className="border-zinc-600 my-1" />

      <section
        onClick={handleFeatureSoonShow}
        className={`flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`}
      >
        <div className="">
          <MdHistory className="text-2xl" />
        </div>
        <div className={` text-[1.1rem] font-[420] `}>History</div>
      </section>

      <section
      onClick={handleFeatureSoonShow}
        className={`flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`}
      >
        <div className="">
          <MdOutlineSubscriptions className="text-2xl" />
        </div>
        <div className={` text-[1.1rem] font-[420] `}>Playlist</div>
      </section>
      <hr className="border-zinc-600 my-1" />

      <section
      onClick={handleFeatureSoonShow}
        className={`flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`}
      >
        <div className="">
          <IoSettingsOutline className="text-2xl" />
        </div>
        <div className={` text-[1.1rem] font-[420] `}>Settings</div>
      </section>

      <NavLink to="/profile" 
        className={`flex gap-5 p-3 px-5 hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`}
      >
        <div className="">
          <CgProfile className="text-2xl" />
        </div>
        <div className={` text-[1.1rem] font-[420] `}>Profile</div>
      </NavLink>
    </div>
  );
}

export default Sidebar2;
