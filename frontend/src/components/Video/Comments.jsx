import React from "react";
import { useEffect, useState } from "react";
import { BiLike, BiDislike } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

function Comments() {
  return (
    <div className="flex gap-2 w-full h-[20rem]  border-zinc-600 p-2 py-5 rounded-2xl flex-col">
      {/* video description */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[1.2rem] font-semibold">345 Comments</h1>

        {/* profile and input */}
        <section className="flex gap-5 ">
          <div className="w-[3rem]">
            <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
              <img className="w-full h-full object-cover" src="https://www.hollywoodreporter.com/wp-content/uploads/2024/08/Shah-Rukh-Khan-Final-Getty-H-2024.jpg?w=1296&h=730&crop=1" alt="" />
            </div>
          </div>
          {/* input, cancel, comment */}
          <div className="flex flex-col w-full gap-2">
            <div className="  ">
              {/* make an underlined input */}
              <input
                type="text"
                className="w-full bg-transparent focus:outline-none border-b border-zinc-600 focus:border-zinc-400"
                placeholder="Add a comment..."
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button className="p-[.4rem] px-5 border border-zinc-600 rounded-full text-sm font-semibold">
                Cancel
              </button>
              <button className="p-[.4rem] px-5 bg-blue-600 active:bg-blue-800 border-zinc-600 rounded-full text-sm font-semibold">
                Comment
              </button>
            </div>
          </div>
        </section>

        {/* comments by user */}
        <sections className="flex gap-5 flex-col">
          <div className="flex gap-2">
            {/* profile pic */}
            <div className="w-[3rem]">
              <div className="w-[45px] h-[45px] overflow-hidden rounded-full">
                <img className="w-full h-full object-cover" src="https://img.staticmb.com/mbcontent/images/crop/uploads/2024/6/shahrukh-khan-house_0_1200.jpg" alt="" />
              </div>
            </div>
            {/* profile name, comment */}
            <div className="flex flex-col gap-1">
              {/* profile name */}
              <h1 className="text-[1rem] flex gap-2 items-center">
                <span className="cursor-pointer">@imsrk24</span>
                <span className="text-zinc-500 text-[.7rem]">1 hour ago</span>
              </h1>
              {/* comment */}
              <p className="text-[.85rem] ml-1">What a fabulous video &lt;3</p>
              {/* like dislike, reply */}
              <div className="flex gap-2 text-[.8rem]">
                <span className="flex items-center gap-1 font-light">
                  <BiLike className="cursor-pointer text-zinc-300 text-[2rem] hover:bg-zinc-700 p-1 rounded-full" />{" "}
                  65k
                </span>
                <span className="flex items-center gap-2 font-light">
                  <BiDislike className="cursor-pointer text-zinc-300 text-[2rem] hover:bg-zinc-700 p-1 rounded-full" />
                </span>
                <span className="font-semibold hover:bg-zinc-700 p-1 rounded-full px-2 cursor-pointer my-auto">
                  Reply
                </span>
              </div>
            </div>
            {/* more button */}
            <div className="self-center ml-auto">
              <BsThreeDotsVertical className="text-[1.8rem] rounded-full  border-zinc-600 active:border p-1 cursor-pointer" />
            </div>
          </div>
          
        </sections>
      </div>
    </div>
  );
}

export default Comments;
