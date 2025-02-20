import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router";
import { MdOutlineEdit } from "react-icons/md";
import { PiYoutubeLogo } from "react-icons/pi";
import { IoMdMore } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import ThreeDot from "./ThreeDot";
import DeleteMenu from "../UI/DeleteMenu";
import { ProfileContext } from "../../contexts/profileContext/profileContext";
import { useScreenWidth } from "../../utils/screenWidth";
import { GoPlusCircle } from "react-icons/go";


function VideoSection({ videos }) {
  const [optionShow, setOptionShow] = useState({});
  const [optionShowMobile, setOptionShowMobile] = useState({});
  const [moreFunctionShow, setMoreFunctionShow] = useState({});

  const { deleteClick } = useContext(ProfileContext);
  const { videoSectionShow } = useContext(ProfileContext);

  const screenWidth = useScreenWidth();

  const handleMouseEnter = (index) => {
    if (screenWidth > 500) {
      setOptionShow((prev) => ({ ...prev, [index]: true }));
    }
  };

  const handleMouseLeave = (index) => {
    if (screenWidth > 500) {
      setOptionShow((prev) => ({ ...prev, [index]: false }));
    }
  };

  const handleMouseClickMobile = (index) => {
    if (screenWidth <= 500) {
      setOptionShowMobile((prev) => {
        const newState = {};
        Object.keys(prev).forEach((key) => {
          newState[key] = false;
        });
        return { ...newState, [index]: !prev[index] };
      });
    }
  };

  // more options
  const handleMoreClick = (index) => {
    setMoreFunctionShow((prev) => {
      const newState = {};
      Object.keys(prev).forEach((key) => {
        newState[key] = false;
      });
      return { ...newState, [index]: !prev[index] };
    });
  };
  const handleClickOutside = (event) => {
    if (
      !event.target.closest(".more-options") &&
      !event.target.closest(".more-options-content")
    ) {
      setMoreFunctionShow({});
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const darkHoverOnBtn = "dark:bg-[#c2d8f1] dark:hover:bg-[#9eafc3]";
  const darkText = "dark:text-zinc-800";

  return (
    <div>
      
      {videos && videos.length == 0 && (
        <div className="flex justify-center items-center py-5 flex-col">
          <h1 className="text-2xl font-semibold">No video posted</h1>
          <NavLink
            to={`/upload/`}
            className="flex gap-2 items-center mt-10 cursor-pointer animate-pulse"
          >
            <GoPlusCircle className="text-xl  " />
            <h1 className="">Post a video</h1>
          </NavLink>
        </div>
      )}
      {videoSectionShow && videos && videos.length != 0 && (
        <div>
          <table className="w-full ">
            <thead className="">
              <tr className="border-b border-[#434343]">
                <th className="p-2 px-8 text-left ">Video</th>
                <th className="p-2 px-8 text-center">Views</th>
                <th className="p-2 px-8 text-center">Likes</th>
                <th className="p-2 px-8 text-center text-nowrap">
                  Modified date
                </th>
                <th className="p-2 px-8 text-right text-nowrap">
                  More Options
                </th>
              </tr>
            </thead>
            <tbody>
              {/* video table */}
              {videos?.map((video, index) => (
                <tr
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  onClick={() => handleMouseClickMobile(index)}
                  className="border-b border-[#434343]"
                >
                  <td className="p-2 px-8 ">
                    <section className="flex gap-2 ">
                      <div className="border overflow-hidden border-[#434343] rounded-lg min-w-[7.5rem] max-w-[7.5rem] h-[4.5rem] ">
                        {/* thumbnail */}
                        <img
                          className="w-full h-full object-cover"
                          src={video?.thumbnail}
                          alt=""
                        />
                      </div>

                      <div className={`${darkText} text-[.75rem] text-zinc-300 mt-3 relative flex-grow`}>
                        <h1 className="text-[.75rem] line-clamp-1 max-w-[6rem]">
                          {video?.title}
                        </h1>
                        <section
                          className={`${
                            optionShow[index] || optionShowMobile[index]
                              ? "block"
                              : "hidden"
                          } 
                      absolute left-0 flex  bottom-0  rounded-full`}
                        >
                          <NavLink
                            to={`/video-update/${video?._id}`}
                            className={` p-2 cursor-pointer rounded-full text-xl hover:bg-[#353535] dark:hover:bg-[#9da8af]`}
                          >
                            <MdOutlineEdit />
                          </NavLink>
                          <NavLink
                            to={`/p/${video?._id}`}
                            className={` p-2 cursor-pointer rounded-full text-xl hover:bg-[#353535] dark:hover:bg-[#9da8af]`}
                          >
                            <PiYoutubeLogo />
                          </NavLink>

                          <div
                            onClick={() => handleMoreClick(index)}
                            className={`more-options p-2 cursor-pointer rounded-full text-xl hover:bg-[#353535] dark:hover:bg-[#9da8af]`}
                          >
                            <IoMdMore />
                          </div>
                        </section>
                        {/* more options functionality */}
                        {moreFunctionShow[index] && <ThreeDot video={video} />}
                      </div>
                    </section>
                  </td>
                  <td className="p-2 px-8 align-text-top pt-3 text-center">
                    {video?.viewsCount}
                  </td>
                  <td className="p-2 px-8 align-text-top pt-3 text-center">
                    {video?.likesCount}
                  </td>
                  <td className="p-2 px-8 align-text-top pt-3 text-center text-nowrap">
                    {video?.createdAt
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("-")}
                  </td>
                  <td className="p-2 px-8 text-right align-text-top pt-3 ">
                    <NavLink
                      to={`/video-update/${video?._id}`}
                      className={`${darkHoverOnBtn} ml-auto p-[.5rem] px-3 hover:bg-[#535353] bg-[#343434] rounded-full font-[500] text-[.8rem] text-nowrap `}
                    >
                      Edit Video
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* temp */}
          {deleteClick && <DeleteMenu />}
        </div>
      )}
    </div>
  );
}

export default VideoSection;
