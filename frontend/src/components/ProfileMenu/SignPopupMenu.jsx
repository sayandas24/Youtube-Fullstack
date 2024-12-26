import React, { useContext, useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { GoMoon } from "react-icons/go"; 
import { CiLocationOn } from "react-icons/ci";
import axiosInstance from "../../utils/axiosInstance";
import { NavLink } from "react-router";
import { FeatureSoonContext } from "../../contexts/featureSoonContext/UseFeatureSoon";

function SignPopupMenu() {
  const [user, setUser] = useState({});

  const {handleFeatureSoonShow}  = useContext(FeatureSoonContext)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/user/current-user"); 
        setUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

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
    <div>
      <div className=" rounded-xl bg-[#282828] text-white w-[20rem] h-fit mx-auto py-3">
        <section className=" flex gap-3 p-3">
          <div className="rounded-full h-[3rem] w-[3rem] overflow-hidden">
            <img className="w-full h-full object-cover" src={user.avatar} alt="" />
          </div>
          <div>
            <div className="leading-[1.4rem] ">
              <h1 className="text-[1rem] ">{user.fullName}</h1>
              <h1 className="text-[1rem] ">@{user.username}</h1>
              <NavLink to="/profile" className="text-[1rem] text-blue-400 cursor-pointer mt-2">
                View Your Profile
              </NavLink>
            </div>
          </div>
        </section>
        <hr className="border-zinc-600 my-1" />
        <section onClick={handleFeatureSoonShow} className="p-3 hover:bg-[#383838] cursor-pointer">
          <div className="flex gap-3 items-center">
            <IoSettingsOutline className="text-2xl text-[#cacaca]" />
            <h1 className="text-[1rem] font-[320]">Settings</h1>
          </div>
        </section> 
        <section onClick={handleFeatureSoonShow} className="p-3 hover:bg-[#383838] cursor-pointer">
          <div className="flex gap-3 items-center">
            <AiOutlineExclamationCircle  className="text-2xl text-[#cacaca]" />
            <h1 className="text-[1rem] font-[320]">About</h1>
          </div>
        </section>
        <hr className="border-zinc-600 my-1" />
        <section onClick={handleFeatureSoonShow} className="p-3 hover:bg-[#383838] cursor-pointer">
          <div className="flex gap-3 items-center ">
            <GoMoon  className="text-2xl text-[#cacaca]" />
            <h1 className="text-[1rem] font-[320]">Appearance: Dark</h1>
          </div>
        </section>
        <hr className="border-zinc-600 my-1" />
        <section onClick={handleFeatureSoonShow} className="p-3 hover:bg-[#383838] cursor-pointer">
          <div className="flex gap-3 items-center">
            <CiLocationOn  className="text-2xl text-[#cacaca]" />
            <h1 className="text-[1rem] font-[320]">Location: India</h1>
          </div>
        </section>


        <section className="p-3 hover:bg-[#383838] cursor-pointer" onClick={logout}>
          <div className="flex gap-3 items-center">
            <IoSettingsOutline className="text-2xl text-[#cacaca]" />
            <h1 className="text-[1rem] font-[320]">Sign out</h1>
          </div>
        </section> 
      </div>
    </div>
  );
}

export default SignPopupMenu;
