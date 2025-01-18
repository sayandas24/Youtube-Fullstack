import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Layout/Sidebar";
import { RxCross1 } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import axiosInstance from "../../utils/axiosInstance";
import { NavLink } from "react-router";

function WatchHistory() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/user/history")
      .then((res) => {
        setData(res.data.data); 
      })
    .catch((err) => {
      console.log("WatchHistory not found", err);
    });
  }, []);

  return (
    <div className="overflow-x-hiddena flex">
      <section className="max-[500px]:hidden">
        <Sidebar />
      </section>

      <section className="min-[500px]:w-[60rem] mx-auto flex justify-center text-white flex-col gap-1 max-[500px]:mb-[3rem] max-[500px]:mt-5">
        {data &&
          data.map((video) => (
            <div
              key={data._id}
              className=" rounded-xl min-[500px]:h-[11rem] flex p-2"
            >
              <NavLink to={`/p/${video._id}`} className="h-full w-[18rem]  overflow-hidden rounded-xl max-[600px]:w-[12rem] max-[500px]:h-[7.5rem] max-[750px]:w-[14rem] max-[750px]:h-[8.5rem]

               flex-shrink-0 max-[450px]:!h-[6.5rem] max-[450px]:!w-[10rem] max-[350px]:!h-[5.5rem] max-[350px]:!w-[8.5rem]">
                <img className="w-full h-full object-cover" src={video.thumbnail} alt="" />
              </NavLink>

              <section className="w-full  flex-1">
                <div className=" flex justify-between flex-row w-full p-2 pl-5 max-[450px]:pl-2 max-[450px]:pr-0">
                  <h1 className="text-xl line-clamp-2 max-[600px]:text-[1rem]">
                    {video.title}
                  </h1>
                  <div className="ml-auto flex  gap-5 max-[600px]:gap-1">
                    <RxCross1 className="cursor-pointer max-[600px]:p-2 max-[600px]:text-[2rem] text-[3rem] p-3 rounded-full hover:bg-[#2c2c2c]" />
                    <BsThreeDotsVertical className="cursor-pointer max-[600px]:p-2 max-[600px]:text-[2rem] text-[3rem] p-3 rounded-full active:bg-[#2c2c2c]" />
                  </div>
                </div>

                <div className="flex gap-1 my-1 text-[#aaaaaa] px-5 font-[450] max-[600px]:text-[.8rem] max-[450px]:pl-2">
                  <span>{video.owner.fullName}</span>
                  <span>|&nbsp;{video.viewsCount} Views</span>
                </div>

                
              </section>
            </div>
          ))}
      </section>
    </div>
  );
}

export default WatchHistory;
