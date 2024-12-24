import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router";
import { MdOutlineEdit } from "react-icons/md";
import { PiYoutubeLogo } from "react-icons/pi";
import { IoMdMore } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import ThreeDot from "./ThreeDot"; 
import DeleteMenu from "../UI/DeleteMenu";
import { ProfileContext } from "../../contexts/profileContext/profileContext";

function VideoSection({ videos }) {
  const [optionShow, setOptionShow] = useState({});
  const [moreFunctionShow, setMoreFunctionShow] = useState({});

  const {deleteClick} = useContext(ProfileContext)
  

  const handleMouseEnter = (index) => {
    setOptionShow((prev) => ({ ...prev, [index]: true }));
  };

  const handleMouseLeave = (index) => {
    setOptionShow((prev) => ({ ...prev, [index]: false }));
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

  return (
    <div>
      <table className="w-full">
        <thead className="">
          <tr className="border-b border-[#434343]">
            <th className="p-2 px-8 text-left">Video</th>
            <th className="p-2 px-8 text-left">Views</th>
            <th className="p-2 px-8 text-left">Modified date</th>
            <th className="p-2 px-8 text-right">More Options</th>
          </tr>
        </thead>
        <tbody>
          {/* video table */}
          {videos?.map((video, index) => (
            <tr
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="border-b border-[#434343]"
            >
              <td className="p-2 px-8 ">
                <section className="flex gap-2 ">
                  <div className="border overflow-hidden border-[#434343] rounded-lg w-[7.5rem] h-[4.5rem]">
                    {/* thumbnail */}
                    <img
                      className="w-full h-full object-cover"
                      src={video?.thumbnail}
                      alt=""
                    />
                  </div>

                  <div className="text-[.75rem] text-zinc-300 mt-3 relative flex-grow">
                    <h1 className="text-[.75rem]">{video?.title}</h1>
                    <section
                      className={`${
                        optionShow[index] ? "block" : "hidden"
                      } absolute left-0 flex  bottom-0  rounded-full`}
                    >
                      <NavLink
                        to={`/video-update/${video?._id}`}
                        className=" p-2 cursor-pointer rounded-full text-xl hover:bg-[#353535]"
                      >
                        <MdOutlineEdit />
                      </NavLink>
                      <div className=" p-2 cursor-pointer rounded-full text-xl hover:bg-[#353535]">
                        <PiYoutubeLogo />
                      </div>

                      <div
                        onClick={() => handleMoreClick(index)}
                        className="more-options p-2 cursor-pointer rounded-full text-xl hover:bg-[#353535]"
                      >
                        <IoMdMore />
                      </div>
                    </section>
                    {/* more options functionality */}
                    {moreFunctionShow[index] && <ThreeDot video={video} />}
                  </div>
                </section>
              </td>
              <td className="p-2 px-8 align-text-top pt-3">{video?.views}</td>
              <td className="p-2 px-8 align-text-top pt-3">
                {video?.createdAt.slice(0, 10).split("-").reverse().join("-")}
              </td>
              <td className="p-2 px-8 text-right align-text-top pt-3">
                <NavLink
                  to={`/video-update/${video?._id}`}
                  className="ml-auto p-[.5rem] px-3 hover:bg-[#535353] bg-[#343434] rounded-full font-[500] text-[.8rem]"
                >
                  Edit Video
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* temp */}
      {
        deleteClick && <DeleteMenu />
      }
      
    </div>
  );
}

export default VideoSection;
