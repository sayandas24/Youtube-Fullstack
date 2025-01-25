import React, { useContext } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiVideoLight } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { NavLink } from "react-router";
import { FeatureSoonContext } from "../../contexts/featureSoonContext/UseFeatureSoon";
import Skeleton from "react-loading-skeleton";
import { ProfileContext } from "../../contexts/profileContext/profileContext";
import { useTheme } from "next-themes";
import axiosInstance from "../../utils/axiosInstance";
import { GoSignOut } from "react-icons/go";


import { ShineBorder } from "@/components/magicui/shine-border";

function ProfileSection({ user, showUserContent, showDashboard }) {
  const { handleFeatureSoonShow } = useContext(FeatureSoonContext);
  const { profileContentPassFunc } = useContext(ProfileContext);
  const theme = useTheme();

  const logout = async () => {
    console.log("logout");
    await axiosInstance
      .post("/user/logout")
      .then((res) => {
        console.log(res);
        localStorage.removeItem("accessToken");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    // localStorage.removeItem("accessToken");
  };

  return (
    <ShineBorder
      color={theme.theme === "dark" ? "white" : "white"}
      className="flex flex-col justify-normal px-4 h-full"
    >
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

      <div className="mt-8 w-full">
        <section
          onClick={() => profileContentPassFunc("dashboard")}
          className={`${
            showDashboard ? "bg-[#2d2d2d]" : ""
          } hover:bg-[#2d2d2d] rounded-lg p-2 px-3 flex items-center gap-2 cursor-pointer`}
        >
          <LuLayoutDashboard className="text-xl" />
          <h1 className="text-[1rem] font-semibold">Dashboard</h1>
        </section>
        <section
          onClick={() => {
            profileContentPassFunc("content");
          }}
          className={`${
            showUserContent ? "bg-[#2d2d2d]" : ""
          } hover:bg-[#2d2d2d] mt-1 rounded-lg p-2 px-3 flex items-center gap-2`}
        >
          <PiVideoLight className="text-xl" />
          <h1 className="text-[1rem] font-semibold">Content</h1>
        </section>
      </div>

      <div className="mt-auto w-full">
        <section
          onClick={() => {
            handleFeatureSoonShow();
            profileContentPassFunc("settings");
          }}
          className="cursor-pointer hover:bg-[#2d2d2d] rounded-lg p-2 px-3 flex items-center gap-2"
        >
          <CiSettings className="text-xl" />
          <h1 className="text-[1rem] font-semibold">Settings</h1>
        </section>
        <section
          onClick={() => {
            handleFeatureSoonShow();
            profileContentPassFunc("about");
          }}
          className="cursor-pointer hover:bg-[#2d2d2d] rounded-lg p-2 px-3 flex items-center gap-2"
        >
          <CiCircleInfo className="text-xl" />
          <h1 className="text-[1rem] font-semibold">About</h1>
        </section>

        <section
          onClick={logout}
          className="cursor-pointer hover:bg-[#2d2d2d] rounded-lg p-2 px-3 flex items-center gap-2"
        >
          <GoSignOut className="text-xl" />

          <h1 className="text-[1rem] font-semibold">Sign Out</h1>
        </section>
      </div>
    </ShineBorder>
  );
}

export default ProfileSection;
