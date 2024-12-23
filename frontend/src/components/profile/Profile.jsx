import React from 'react'
import { LuLayoutDashboard } from "react-icons/lu";
import { PiVideoLight } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";

function Profile() {
  return (
    <section className=" flex flex-col justify-normal px-4 h-full">
        <div className="w-full flex flex-col items-center gap-1">
          <section className="h-[8rem] w-[8rem] border rounded-full">
            <img src="" alt="" />
          </section>
          <section>Your Channel</section>
          <section className="text-zinc-600 text-sm">sayanthisside</section>
        </div>

        <div className="mt-8">
          <section className="hover:bg-[#1f1f1f] rounded-lg p-2 px-3 flex items-center gap-2">
            <LuLayoutDashboard className="text-xl" />
            <h1 className="text-[1rem] font-semibold">Dashboard</h1>
          </section>
          <section className="hover:bg-[#1f1f1f] rounded-lg p-2 px-3 flex items-center gap-2">
            <PiVideoLight className="text-xl" />
            <h1 className="text-[1rem] font-semibold">Content</h1>
          </section>
        </div>

        <div className="mt-auto">
          <section className="hover:bg-[#1f1f1f] rounded-lg p-2 px-3 flex items-center gap-2">
            <CiSettings className="text-xl" />
            <h1 className="text-[1rem] font-semibold">Settings</h1>
          </section>
          <section className="hover:bg-[#1f1f1f] rounded-lg p-2 px-3 flex items-center gap-2">
            <CiCircleInfo className="text-xl" />
            <h1 className="text-[1rem] font-semibold">About</h1>
          </section>
        </div>
      </section>
  )
}

export default Profile
