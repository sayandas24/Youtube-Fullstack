import React, { useState, useEffect, useRef, useContext } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { GoMoon } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { NavLink } from "react-router";
import { FeatureSoonContext } from "../../contexts/featureSoonContext/UseFeatureSoon";
import { AnimatedButton } from "../UI/AnimatedButton";
import { UseDarkModeContext } from "../../contexts/darkModeContext/UseDarkMode";

function NotSignPopupMenu() {
  const [menuActive, setMenuActive] = useState(false);

  const { handleFeatureSoonShow } = useContext(FeatureSoonContext);
  const { darkMode, setDarkMode } = useContext(UseDarkModeContext);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center gap-3 relative items-center box-content">
      {/* Button */}
      <div
        ref={buttonRef} // Attach ref to button
        onClick={(e) => {
          e.stopPropagation(); // Prevent propagation
          setMenuActive((prev) => !prev); // Toggle menuActive
        }}
        className={`duration-500 rounded-full  border-[#696969] cursor-pointer dark:active:bg-[#aac7f2] active:bg-[#282828] text-white p-3 h-fit`}
      >
        <div className="flex gap-1 items-center">
          <BsThreeDotsVertical className="text-2xl text-[#cacaca] smallIcon dark:text-[#383838]" />
        </div>
      </div>

      {/* Menu */}
      {menuActive && (
        <div
          ref={menuRef} // Attach ref to menu
          className="absolute top-[3.5rem] z-10 right-[2rem] rounded-xl bg-[#282828] text-white w-[20rem] h-fit py-3 max-[400px]:w-[17rem] dark:bg-[#d0dbf1] dark:text-black"
        >
          <section
            onClick={() => handleFeatureSoonShow()}
            className="p-3 dark:hover:bg-[#b4bdd9] hover:bg-[#383838] cursor-pointer"
          >
            <div className="flex gap-3 items-center">
              <IoSettingsOutline className="text-2xl text-[#cacaca] dark:text-[#383838]" />
              <h1 className="text-[1rem] font-[320]">Settings</h1>
            </div>
          </section>
          <section
            onClick={() => handleFeatureSoonShow()}
            className="p-3 dark:hover:bg-[#b4bdd9] hover:bg-[#383838] cursor-pointer"
          >
            <div className="flex gap-3 items-center">
              <AiOutlineExclamationCircle className="text-2xl text-[#cacaca] dark:text-[#383838]" />
              <h1 className="text-[1rem] font-[320]">About</h1>
            </div>
          </section>
          <hr className="border-zinc-600 my-1" />
          <section
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 dark:hover:bg-[#b4bdd9] hover:bg-[#383838] cursor-pointer"
          >
            <div className="flex gap-3 items-center ">
              <GoMoon className="text-2xl text-[#cacaca] dark:text-[#383838]" />
              <h1 className="text-[1rem] font-[320]">
                {darkMode ? "Appearance: Light" : "Appearance: Dark"}
              </h1>
            </div>
          </section>
          <hr className="border-zinc-600 my-1" />
          <section
            onClick={() => handleFeatureSoonShow()}
            className="p-3 dark:hover:bg-[#b4bdd9] hover:bg-[#383838] cursor-pointer"
          >
            <div className="flex gap-3 items-center">
              <CiLocationOn className="text-2xl text-[#cacaca] dark:text-[#000000]" />
              <h1 className="text-[1rem] font-[320]">Location: India</h1>
            </div>
          </section>
          <hr className="border-zinc-600 my-1" />

          <NavLink
            to="/login"
            className="p-3 dark:hover:bg-[#b4bdd9] hover:bg-[#383838] cursor-pointer block"
          >
            <div className="flex gap-3 items-center">
              <CgProfile className="text-2xl text-[#cacaca] dark:text-[#383838]" />
              <h1 className="text-[1rem] font-[320]">
                Sign in to upload content
              </h1>
            </div>
          </NavLink>
        </div>
      )}

      <NavLink to="/login">
        <AnimatedButton text="✨ Login" />
      </NavLink>
    </div>
  );
}

export default NotSignPopupMenu;
