import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { IoMdMenu } from "react-icons/io";
import metube from "../../assets/metube.svg";
import { IoIosSearch } from "react-icons/io";
import NotSignPopupMenu from "../ProfileMenuPopup/NotSignPopupMenu";
import { IoMdMic } from "react-icons/io";
import { CollapseContext } from "../../contexts/collapseMenu/CollapseContext";
import axiosInstance from "../../utils/axiosInstance";
import SignPopupMenu from "../ProfileMenuPopup/SignPopupMenu";
import { GoPlus } from "react-icons/go";
import { LuMessageSquareDiff } from "react-icons/lu";

import { SlCloudUpload } from "react-icons/sl";
import { FeatureSoonContext } from "../../contexts/featureSoonContext/UseFeatureSoon";
import { useScreenWidth } from "../../utils/screenWidth";
import "../../responsive/navbar.scss";
import { ProfileContext } from "../../contexts/profileContext/profileContext";

function Navbar() {
  const { collapse, setCollapse } = useContext(CollapseContext);
  const { collapse2, setCollapse2 } = useContext(CollapseContext);
  const { handleFeatureSoonShow } = useContext(FeatureSoonContext);
  const { setShowUserTweet, setShowUserVideo } = useContext(ProfileContext);

  

  const [user, setUser] = useState({});
  const [profileClick, setProfileClick] = useState(false);
  const [profilepic, setProfilepic] = useState("");
  const [createClick, setCreateClick] = useState(false);

  const createMenuRef = useRef(null);
  const createButtonRef = useRef(null);
  const profileMenuRef = useRef(null);
  const profileButtonRef = useRef(null);

  const screenWidth = useScreenWidth();

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

  if (screenWidth < 1024) {
    setCollapse(true);
  }

  // Handle menu
  const handleMenu = () => {
    if (screenWidth > 1024) {
      setCollapse(!collapse);
    }
    setCollapse2(!collapse2);
  };
  // Handle profile menu
  const onCreateClick = () => {
    setCreateClick(!createClick);
    window.scrollTo({ top: 0, behavior: "smooth" })
 
  };
  const onCreateBtnClick = () => { 
    window.scrollTo({ top: 0, behavior: "smooth" })
    setShowUserTweet(true);
    setShowUserVideo(false); 
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
    <nav
      id="nav"
      className="relative top-0 left-0 w-full z-50 bg-[#0f0f0f] min-h-[6rem] max-[500px]:min-h-[3rem]"
    >
      {/* <NewFeatureMSG/>   */}
      <ul className="flex fixed bg-[#0f0f0f] w-full top-0 text-md text-white  gap-0  p-5 pb-1 px-[1.6rem] justify-between items-center">
        <section>
          <div className="flex gap-3 items-center max-[650px]:gap-1">
            <IoMdMenu
              onClick={handleMenu}
              className="hide-item-in-small more-options text-[2.6rem] hover:bg-[#252525] duration-75 cursor-pointer active:bg-[#343434] rounded-full p-2"
            />
            <div
              id="logo"
              className="flex items-center border-[#555555] p-5 rounded-full py-2"
            >
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
                id="search"
                type="text"
                className=" pl-5 h-[2.90rem] w-[30rem]a outline-none focus:border-[#0062ff] rounded-full border-[#393939] border bg-[#121212] rounded-r-none"
                placeholder="Search"
              />
              <div
                onClick={() => handleFeatureSoonShow()}
                id="search-icon"
                className="flex  justify-center items-center rounded-l-none  h-[3rem] px-5 rounded-full bg-[#222222]"
              >
                <IoIosSearch className="text-[1.4rem] smallIcon" />
              </div>
            </div>
            <div
              id="mic-icon"
              onClick={() => handleFeatureSoonShow()}
              className="h-[3rem] w-[3rem] flex items-center hide-item-in-small justify-center rounded-full bg-[#222222] hover:bg-[#2f2f2f]"
            >
              <IoMdMic className="text-2xl smallIcon" />
            </div>
          </div>
        </section>
        <section>
          {/* <SignPopupMenu/> */}
          {user.data ? (
            <div className="flex items-center gap-4">
              <section
                ref={createButtonRef}
                onClick={onCreateClick}
                className="cursor-pointer bg-[#272727] hover:bg-[#2f2f2f] active:bg-[#454545] rounded-full h-[2.8rem] gap-1 px-3 flex items-center justify-center max-[500px]:h-[2.3rem]"
              >
                <GoPlus className="text-[1.7rem]" />
                <h1 className="text-[1rem] font-semibold max-[500px]:text-[0.8rem]">
                  Create
                </h1>
              </section>
              {createClick && (
                <div
                  ref={createMenuRef}
                  className="absolute top-[5rem] right-[2rem] z-50"
                >
                  <section className="bg-[#272727] w-[12rem] py-5 rounded-lg  overflow-hidden">
                    <NavLink
                      to="/upload"
                      className="flex items-center gap-4 p-3 px-4 hover:bg-[#3b3b3b] cursor-pointer"
                    >
                      <SlCloudUpload className="text-[1.3rem]" />
                      <h1 className="text-[1rem] ">Upload Video</h1>
                    </NavLink>
                    <Link
                      to={`/channel/${user.data.username}`}
                      onClick={() =>
                        onCreateBtnClick()
                      }
                      className="flex items-center gap-4 p-3 px-4 hover:bg-[#3b3b3b] cursor-pointer"
                    >
                      <LuMessageSquareDiff className="text-[1.3rem]" />
                      <h1 className="text-[1rem] ">Create Tweet</h1>
                    </Link>
                  </section>
                </div>
              )}

              <section
                onClick={() => setProfileClick(!profileClick)}
                ref={profileButtonRef}
                className={` ${
                  profileClick ? "border-blue-500" : "border-transparent"
                } border hide-item-in-small w-[3rem] h-[3rem] rounded-full overflow-hidden`}
              >
                <img
                  className="w-full h-full object-cover "
                  src={profilepic}
                  alt="avatar"
                />
              </section>
              {profileClick && (
                <div
                  ref={profileMenuRef}
                  className="absolute top-[5rem] right-[2rem] z-50"
                >
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
