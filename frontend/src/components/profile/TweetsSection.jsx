import React, { useContext, useState } from "react";
import { ProfileContext } from "../../contexts/profileContext/profileContext";
import { NavLink } from "react-router";
import { MdOutlineEdit } from "react-icons/md";
import { PiYoutubeLogo } from "react-icons/pi";
import { IoMdMore } from "react-icons/io";
import ThreeDot from "./ThreeDot";
import { useEffect } from "react";
import { GoPlusCircle } from "react-icons/go";


function TweetsSection({ tweets, user }) {
  const { tweetsSectionShow } = useContext(ProfileContext); 

  

  return (
    <div className="">
      {
        tweetsSectionShow  && tweets.length == 0 &&  (
          <div className="flex justify-center items-center py-5 flex-col">
            <h1 className="text-2xl font-semibold">No tweets yet</h1>
            <NavLink  to={`/channel/${user?.username}`} className="flex gap-2 items-center mt-10 cursor-pointer animate-pulse">
              <GoPlusCircle className="text-xl  " />
              <h1 className="">Create a tweet</h1>
            </NavLink>
          </div>
        )
      }
      {tweetsSectionShow  && tweets.length != 0 && (
        <div>
          <table className="w-full ">
            <thead className="">
              <tr className="border-b border-[#434343]">
                <th className="p-2 px-8 text-left ">Tweet</th>
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

              {tweets?.map((tweet) => (
                <tr key={tweet._id} className="border-b border-[#434343]">
                  <td className="p-2 px-8 ">
                    <section className="flex gap-2 ">
                      <div className="border overflow-hidden border-[#434343] rounded-lg min-w-[7.5rem] max-w-[7.5rem] h-[4.5rem] ">
                        {/* thumbnail */}
                        <img
                          className="w-full h-full object-cover"
                          src={tweet?.contentImage ? tweet?.contentImage : "https://designshack.net/wp-content/uploads/Silhouette-Aesthetic-Calligraphy-Font.jpg"}
                          alt=""
                        />
                      </div>

                      <div className="text-[.75rem] text-zinc-300 mt-3 relative flex-grow">
                        <h1 className="text-[.75rem] line-clamp-1 max-w-[6rem]">
                          {tweet?.content}
                        </h1>
                        <section
                          className={`
                             
                      absolute left-0 flex  bottom-0  rounded-full`}
                        >
                          <NavLink
                            to={`/channel/${user?.username}`}
                            className=" p-2 cursor-pointer rounded-full text-xl hover:bg-[#353535]"
                          >
                            <MdOutlineEdit />
                          </NavLink>
                        </section>
                      </div>
                    </section>
                  </td>
                  <td className="p-2 px-8 align-text-top pt-3 text-center">
                    N/A
                  </td>
                  <td className="p-2 px-8 align-text-top pt-3 text-center text-nowrap">
                    {tweet?.likesCount} likes
                  </td>
                  <td className="p-2 px-8 align-text-top pt-3 text-center text-nowrap">
                    {tweet?.updatedAt
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("-")}
                  </td>
                  <td className="p-2 px-8 text-right align-text-top pt-3 ">
                    <NavLink
                      // to={`/video-update/${video?._id}`}
                      className="ml-auto p-[.5rem] px-3 hover:bg-[#535353] bg-[#343434] rounded-full font-[500] text-[.8rem] text-nowrap"
                    >
                      Edit Tweet
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TweetsSection;
