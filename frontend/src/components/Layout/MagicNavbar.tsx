import { Dock, DockIcon } from "@/components/magicui/dock";
import React, { useContext, useEffect, useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { MdHistory } from "react-icons/md";
import { NavLink } from "react-router";
import { FeatureSoonContext } from "@/contexts/featureSoonContext/UseFeatureSoon";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import axiosInstance from "../../utils/axiosInstance";
import DarkModeSwitch from "@/components/UI/DarkModeSwitch";


export default function MagicNavbar() {
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
    <div className="h-fit self-center rounded-full text-white  px-2 gap-1 flex flex-row fixed  bottom-2 ">
      <Dock direction="middle" className="rounded-full overflow-hidden">
        <DockIcon>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? "fill-white bg-[#2c2c2c]X" : ""
              }  small-icon-navlink flex flex-col duration-75  cursor-pointer rounded-xl items-center`
            }
          >
            <GrHomeRounded className="text-xl fill-inherit smallIcon-nav" />
          </NavLink>
        </DockIcon>
        <DockIcon>
          <NavLink
            to="/user/history"
            // onClick={() => handleFeatureSoonShow("History working on it")}
            className={({ isActive }) =>
              `  small-icon-navlink flex flex-col items-center duration-75 cursor-pointer rounded-xl`
            }
          >
            <div className="">
              <MdHistory className="text-2xl smallIcon-nav" />
            </div>
          </NavLink>
        </DockIcon>
        <DockIcon>
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
          </NavLink>
        </DockIcon>
        <DockIcon>
          <DarkModeSwitch />
        </DockIcon>
        <DockIcon>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              ` small-icon-navlink  flex  hover:bg-[#2c2c2c] duration-75 cursor-pointer rounded-xl`
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
              </div>
            )}
          </NavLink>
        </DockIcon>
      </Dock>
    </div>
  );
}
