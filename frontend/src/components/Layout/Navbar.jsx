import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router";
import { IoMdMenu } from "react-icons/io";
import metube from "../../assets/metube.svg";
import { IoIosSearch } from "react-icons/io";
import NotSignPopupMenu from "../ProfileMenu/NotSignPopupMenu";
import { IoMdMic } from "react-icons/io";
import { CollapseContext } from "../../contexts/collapseMenu/CollapseContext";
import axiosInstance from "../../utils/axiosInstance";
import SignPopupMenu from "../ProfileMenu/SignPopupMenu";
import { GoPlus } from "react-icons/go";
import { LuMessageSquareDiff } from "react-icons/lu";

import { SlCloudUpload } from "react-icons/sl"; 
import { FeatureSoonContext } from "../../contexts/featureSoonContext/UseFeatureSoon";


function Navbar() {
  const { collapse, setCollapse } = useContext(CollapseContext);
  const { collapse2, setCollapse2 } = useContext(CollapseContext);
  const {handleFeatureSoonShow}  = useContext(FeatureSoonContext)

  const [user, setUser] = useState({});
  const [profileClick, setProfileClick] = useState(false);
  const [profilepic, setProfilepic] = useState("");
  const [createClick, setCreateClick] = useState(false);

  const createMenuRef = useRef(null);
  const createButtonRef = useRef(null);
  const profileMenuRef = useRef(null);
  const profileButtonRef = useRef(null);

  // Get current user
  useEffect(() => {
    axiosInstance
      .get("/user/current-user")
      .then((res) => {
        setUser(res.data); 
        setProfilepic(res.data.data.avatar);
      })
      .catch((err) => {
        console.log("error in getting current user", err);
      });
  }, []);

  // Handle menu
  const handleMenu = () => {
    setCollapse(!collapse);
    setCollapse2(!collapse2);
  };
  // Handle profile menu
  const onCreateClick = () => { 
    setCreateClick(!createClick);
  };

  useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          createMenuRef.current &&
          !createMenuRef.current.contains(event.target) &&
          createButtonRef.current &&
          !createButtonRef.current.contains(event.target)
        ) {
          setCreateClick(false);
        }
        if (
          profileMenuRef.current &&
          !profileMenuRef.current.contains(event.target) &&
          profileButtonRef.current &&
          !profileButtonRef.current.contains(event.target)
        ) {
          setProfileClick(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

  return (
    <nav className="relative top-0 left-0 w-full z-50 bg-[#0f0f0f] min-h-[6rem]">
      {/* <NewFeatureMSG/>   */}
      <ul className="flex fixed bg-[#0f0f0f] w-full top-0 text-md text-white  gap-5  p-5 pb-1 px-[1.6rem] justify-between">
        <section>
          <div className="flex gap-3 items-center">
            <IoMdMenu
              onClick={handleMenu}
              className="more-options text-[2.6rem] hover:bg-[#252525] duration-75 cursor-pointer active:bg-[#343434] rounded-full p-2"
            />
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
              <div onClick={() => handleFeatureSoonShow()} className="flex justify-center items-center rounded-l-none  h-[3rem] px-5 rounded-full bg-[#222222]">
                <IoIosSearch className="text-[1.4rem]" />
              </div>
            </div>
            <div onClick={() => handleFeatureSoonShow()} className="h-[3rem] w-[3rem] flex items-center justify-center rounded-full bg-[#222222] hover:bg-[#2f2f2f]">
              <IoMdMic className="text-2xl" />
            </div>
          </div>
        </section>
        <section>
          {/* <SignPopupMenu/> */}
          {user.data ? (
            <div className="flex items-center gap-4">
              <section ref={createButtonRef} onClick={onCreateClick} className="cursor-pointer bg-[#272727] hover:bg-[#2f2f2f] active:bg-[#454545] rounded-full h-[2.8rem] gap-1 px-3 flex items-center justify-center">
                <GoPlus className="text-[1.7rem]" />
                <h1 className="text-[1rem] font-semibold">Create</h1>
              </section>
              {
                createClick && (
                  <div ref={createMenuRef} className="absolute top-[5rem] right-[2rem] z-50">

                  <section className="bg-[#272727] w-[12rem] py-5 rounded-lg  overflow-hidden"> 
                     <NavLink to="/upload" className="flex items-center gap-4 p-3 px-4 hover:bg-[#3b3b3b] cursor-pointer">
                        <SlCloudUpload className="text-[1.3rem]"/>
                        <h1 className="text-[1rem] ">Upload Video</h1>
                     </NavLink>
                     <div onClick={() => handleFeatureSoonShow()} className="flex items-center gap-4 p-3 px-4 hover:bg-[#3b3b3b] cursor-pointer">
                        <LuMessageSquareDiff className="text-[1.3rem]"/>
                        <h1 className="text-[1rem] ">Create Tweet</h1>
                     </div> 
                  </section>
                </div>
                )
              }

              <section
                onClick={() => setProfileClick(!profileClick)}
                ref={profileButtonRef}
                className={` ${
                  profileClick ? "border-blue-500" : "border-transparent"
                } border w-[3rem] h-[3rem] rounded-full overflow-hidden`}
              >
                <img
                  className="w-full h-full object-cover"
                  src={profilepic}
                  alt="avatar"
                />
              </section>
              {profileClick && (
                <div ref={profileMenuRef} className="absolute top-[5rem] right-[2rem] z-50">
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
