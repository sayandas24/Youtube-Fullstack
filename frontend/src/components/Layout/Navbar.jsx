import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router";
import { IoMdMenu } from "react-icons/io";
import metube from "../../assets/metube.svg";
import { IoIosSearch } from "react-icons/io";
import NotSignPopupMenu from "../ProfileMenu/NotSignPopupMenu";
import { IoMdMic } from "react-icons/io";
import { CollapseContext } from "../../contexts/collapseMenu/CollapseContext";
import axiosInstance from "../../utils/axiosInstance";
import SignPopupMenu from "../ProfileMenu/SignPopupMenu";

function Navbar() {
  const { collapse, setCollapse } = useContext(CollapseContext);
  const { collapse2, setCollapse2 } = useContext(CollapseContext);

  const [user, setUser] = useState({});
  const [profileClick, setProfileClick] = useState(false);

  console.log(profileClick);

  useEffect(() => {
    axiosInstance
      .get("/user/current-user")
      .then((res) => {
        setUser(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log("error in getting current user", err);
      });
  }, []);

  // console.log("user", user.data);

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

  const handleMenu = () => {
    setCollapse(!collapse);
    setCollapse2(!collapse2);
  };

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-[#0f0f0f]">
      <ul className="flex text-md text-white  gap-5  p-5 pb-1 px-[1.6rem] justify-between">
        <section>
          <div className="flex gap-3 items-center">
            <IoMdMenu
              onClick={handleMenu}
              className="text-[2.6rem] hover:bg-[#252525] duration-75 cursor-pointer active:bg-[#343434] rounded-full p-2"
            />
            <div className="flex items-center border-[#555555] p-5 rounded-full py-2">
              <img className="w-[2rem] invert" src={metube} alt="" />
              <h1 className="font-sacramento font-bold text-[1.5rem]">
                Metube
              </h1>
            </div>
          </div>
        </section>
        {/* <button onClick={getInfo}>Info</button> */}
        <button onClick={logout}>Logout</button>
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
          {/* <SignPopupMenu/> */}
          {user.data ? (
            <div
              onClick={() => setProfileClick(!profileClick)}
              className={` ${
                profileClick ? "border-blue-500" : "border-transparent"
              } border w-[3rem] h-[3rem] rounded-full overflow-hidden`}
            >
              <img
                className="w-full h-full object-cover"
                src={user.data.avatar.replace('"', " ")}
                alt="avatar"
              />
              {profileClick && (
                <div className="absolute top-[5rem] right-[2rem] z-50">
                  <SignPopupMenu />
                </div>
              )}
            </div>
          ) : (
            <NotSignPopupMenu />
          )}
        </section>
      </ul>
    </nav>
  );
}

export default Navbar;
