import React, { useContext } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiVideoLight } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { NavLink } from "react-router";
import { FeatureSoonContext } from "../../contexts/featureSoonContext/UseFeatureSoon";
import Skeleton from "react-loading-skeleton";

function Profile({ user }) {
  const { handleFeatureSoonShow } = useContext(FeatureSoonContext);

  return (
    <section className=" flex flex-col justify-normal px-4 h-full">
      <div className="w-full flex flex-col items-center gap-1">
        <section className="h-[8rem] w-[8rem] rounded-full overflow-hidden">
          {user.avatar ? (
            <img
              className="w-full h-full object-cover"
              src={user?.avatar}
              alt=""
            />
          ) : (
            <Skeleton
              circle
              width={"100%"}
              height={"100%"}
              baseColor="#202020"
              highlightColor="#333"
            />
          )}
        </section>
        <section>
          {user.username ? (
            "Your Channel"
          ) : (
            <Skeleton
              count={1}
              width={150}
              baseColor="#202020"
              highlightColor="#333"
            />
          )}
        </section>
        <section className="text-zinc-400 text-sm">
          {user.username ? (
            user?.username
          ) : (
            <Skeleton
              count={1}
              width={150}
              baseColor="#202020"
              highlightColor="#333"
            />
          )}
        </section>
      </div>

      <div className="mt-8">
        <section
          onClick={() => handleFeatureSoonShow()}
          className="hover:bg-[#1f1f1f] rounded-lg p-2 px-3 flex items-center gap-2 cursor-pointer"
        >
          <LuLayoutDashboard className="text-xl" />
          <h1 className="text-[1rem] font-semibold">Dashboard</h1>
        </section>
        <NavLink
          to="#"
          className={({ isActive }) =>
            `${
              isActive ? "bg-[#1f1f1f]" : ""
            } hover:bg-[#1f1f1f] mt-1 rounded-lg p-2 px-3 flex items-center gap-2`
          }
        >
          <PiVideoLight className="text-xl" />
          <h1 className="text-[1rem] font-semibold">Content</h1>
        </NavLink>
      </div>

      <div className="mt-auto">
        <section
          onClick={() => handleFeatureSoonShow()}
          className="cursor-pointer hover:bg-[#1f1f1f] rounded-lg p-2 px-3 flex items-center gap-2"
        >
          <CiSettings className="text-xl" />
          <h1 className="text-[1rem] font-semibold">Settings</h1>
        </section>
        <section
          onClick={() => handleFeatureSoonShow()}
          className="cursor-pointer hover:bg-[#1f1f1f] rounded-lg p-2 px-3 flex items-center gap-2"
        >
          <CiCircleInfo className="text-xl" />
          <h1 className="text-[1rem] font-semibold">About</h1>
        </section>
      </div>
    </section>
  );
}

export default Profile;
