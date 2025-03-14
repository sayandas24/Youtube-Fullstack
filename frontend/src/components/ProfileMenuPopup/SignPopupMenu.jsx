import React, { useContext, useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { GoMoon } from "react-icons/go"; 
import { CiLocationOn } from "react-icons/ci";
import axiosInstance from "../../utils/axiosInstance";
import { NavLink } from "react-router"; 
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { GoSignOut } from "react-icons/go";
import { UseDarkModeContext } from "../../contexts/darkModeContext/UseDarkMode";
import { toast } from "react-toastify";


function SignPopupMenu() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
 
    const {darkMode, setDarkMode} = useContext(UseDarkModeContext);
  
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/user/current-user"); 
        setUser(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
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
    <SkeletonTheme baseColor="#202020 dark:bg-[#393a3b]" highlightColor="#333 dark:bg-[#d0dbf1]">
      <div className=" rounded-xl bg-[#282828] dark:bg-[#d0dbf1] dark:text-black text-white w-[20rem] h-fit mx-auto py-3">
        <section className=" flex gap-3 p-3">
          <div className="rounded-full h-[3rem] w-[3rem] overflow-hidden">
            {loading? <Skeleton circle count={1} height={50} width={50}/> : (
              <img className="w-full h-full object-cover" src={user.avatar} alt="" /> 
            )}
          </div>
          <div>
            <div className="leading-[1.4rem]">
              {loading? <Skeleton count={1} width={200}/> : (
                <h1 className="text-[1rem] ">{user.fullName}</h1>
              )}
              {loading? <Skeleton count={1} width={200}/> : (
                <h1 className="text-[1rem] ">@{user.username}</h1>
              )}
              <NavLink to="/profile" className="text-[1rem] dark:text-blue-500 text-blue-400 cursor-pointer mt-2">
                View Your Profile
              </NavLink>
            </div>
          </div>
        </section>
        <hr className="border-zinc-600 my-1 dark:border-zinc-400" />
        <section onClick={() => toast.info("Feature coming soon!")} className="p-3 dark:hover:bg-[#b4bdd9] hover:bg-[#383838] cursor-pointer">
          <div className="flex gap-3 items-center">
            <IoSettingsOutline className="text-2xl text-[#cacaca] dark:text-[#383838]" />
            <h1 className="text-[1rem] font-[320]">Settings</h1>
          </div>
        </section> 
        <section onClick={() => toast.info("Feature coming soon!")} className="p-3 dark:hover:bg-[#b4bdd9] hover:bg-[#383838] cursor-pointer">
          <div className="flex gap-3 items-center">
            <AiOutlineExclamationCircle  className="text-2xl text-[#cacaca] dark:text-[#383838]" />
            <h1 className="text-[1rem] font-[320]">About</h1>
          </div>
        </section>
        <hr className="border-zinc-600 my-1" />
        <section onClick={() => setDarkMode(!darkMode)} className="p-3 dark:hover:bg-[#b4bdd9] hover:bg-[#383838] cursor-pointer">
          <div  className="flex gap-3 items-center ">
            <GoMoon  className="text-2xl text-[#cacaca] dark:text-[#383838]" />
            <h1 className="text-[1rem] font-[320]">{darkMode? "Appearance: Light" : "Appearance: Dark"}</h1>
          </div>
        </section>
        <hr className="border-zinc-600 my-1" />
        <section onClick={() => toast.info("Feature coming soon!")} className="p-3 dark:hover:bg-[#b4bdd9] hover:bg-[#383838] cursor-pointer">
          <div className="flex gap-3 items-center">
            <CiLocationOn  className="text-2xl text-[#cacaca] dark:text-[#000000]" />
            <h1 className="text-[1rem] font-[320]">Location: India</h1>
          </div>
        </section>


        <section className="p-3 dark:hover:bg-[#b4bdd9] hover:bg-[#383838] cursor-pointer" onClick={logout}>
          <div className="flex gap-3 items-center">
            <GoSignOut className="text-2xl text-[#cacaca] dark:text-[#383838]" />
            <h1 className="text-[1rem] font-[320]">Sign out</h1>
          </div>
        </section> 
      </div>
    </SkeletonTheme>
  );
}

export default SignPopupMenu;
