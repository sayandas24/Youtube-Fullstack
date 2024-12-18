import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { GoMoon } from "react-icons/go"; 
import { CiLocationOn } from "react-icons/ci";


function SignPopupMenu() {
  return (
    <div>
      <div className=" rounded-xl bg-[#282828] text-white w-[20rem] h-fit mx-auto py-3">
        <section className=" flex gap-3 p-3">
          <div className="border rounded-full h-[3rem] w-[3rem]">
            <img src="" alt="" />
          </div>
          <div>
            <div className="leading-[1.4rem] ">
              <h1 className="text-[1rem] ">Full Name</h1>
              <h1 className="text-[1rem] ">@username</h1>
              <h1 className="text-[1rem] text-blue-400 cursor-pointer mt-2">
                View Your Profile
              </h1>
            </div>
          </div>
        </section>
        <hr className="border-zinc-600 my-1" />
        <section className="p-3">
          <div className="flex gap-3 items-center">
            <IoSettingsOutline className="text-2xl text-[#cacaca]" />
            <h1 className="text-[1rem] font-[320]">Settings</h1>
          </div>
        </section> 
        <section className="p-3">
          <div className="flex gap-3 items-center">
            <AiOutlineExclamationCircle  className="text-2xl text-[#cacaca]" />
            <h1 className="text-[1rem] font-[320]">About</h1>
          </div>
        </section>
        <hr className="border-zinc-600 my-1" />
        <section className="p-3">
          <div className="flex gap-3 items-center ">
            <GoMoon  className="text-2xl text-[#cacaca]" />
            <h1 className="text-[1rem] font-[320]">Appearance: Dark</h1>
          </div>
        </section>
        <hr className="border-zinc-600 my-1" />
        <section className="p-3">
          <div className="flex gap-3 items-center">
            <CiLocationOn  className="text-2xl text-[#cacaca]" />
            <h1 className="text-[1rem] font-[320]">Location: India</h1>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SignPopupMenu;
