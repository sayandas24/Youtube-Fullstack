import React from "react";
import { NavLink } from "react-router";
import { IoMdMenu } from "react-icons/io";
import metube from "../../assets/metube.svg";
import { IoIosSearch } from "react-icons/io";
import NotSignPopupMenu from "../ProfileMenu/NotSignPopupMenu";
import { IoMdMic } from "react-icons/io";

function Navbar() {
  return (
    <nav className="">
      <ul className="flex text-md text-white  gap-5  p-5 justify-between">
        <section>
          <div className="flex gap-3 items-center">
            <IoMdMenu className="text-3xl" />
            <div className="flex items-center border-[#555555] p-5 rounded-full py-2">
              <img className="w-[2rem] invert" src={metube} alt="" />
              <h1 className="font-sacramento font-bold text-[1.5rem]">
                Metube
              </h1>
            </div>
          </div>
        </section>

        <section>
          <div className="flex gap-3 items-center">
            <div className="flex items-center ">
              <input
                type="text"
                className="pl-5 h-[2.90rem] w-[30rem] outline-none focus:border-[#0062ff] rounded-full border-[#393939] border bg-[#121212] rounded-r-none"
                placeholder="Search"
              />
              <div className="flex justify-center items-center rounded-l-none  h-[3rem] px-5 rounded-full bg-[#222222]">
                <IoIosSearch className="text-[1.4rem]" />
              </div>
            </div>
            <div className="h-[3rem] w-[3rem] flex items-center justify-center rounded-full bg-[#222222] hover:bg-[#2f2f2f]">
              <IoMdMic className="text-2xl" />
            </div>
          </div>
        </section>
        <section>
          <NotSignPopupMenu />
        </section>
      </ul>
    </nav>
  );
}

export default Navbar;
