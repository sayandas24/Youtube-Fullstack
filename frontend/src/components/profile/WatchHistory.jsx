import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Layout/Sidebar";
import { RxCross1 } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import axiosInstance from "../../utils/axiosInstance";

function WatchHistory() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/user/history")
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <section>
        <Sidebar />
      </section>

      <section className="w-[70rem] mx-auto flex justify-center text-white flex-col gap-2">
        {data &&
          data.map((video) => (
            <div
              key={data._id}
              className=" rounded-xl h-[13rem] w-[55rem] flex"
            >
              <section className="h-full w-[20rem]  overflow-hidden rounded-xl">
                <img className="w-full h-full object-cover" src={video.thumbnail} alt="" />
              </section>

              <section className="w-full  flex-1">
                <div className=" flex justify-between flex-row w-full p-2 pl-5">
                  <h1 className="text-2xl line-clamp-2">
                    {video.title}
                  </h1>
                  <div className="ml-auto flex  gap-5 ">
                    <RxCross1 className="cursor-pointer  text-[3rem] p-3 rounded-full hover:bg-[#2c2c2c]" />
                    <BsThreeDotsVertical className="cursor-pointer text-[3rem] p-3 rounded-full active:bg-[#2c2c2c]" />
                  </div>
                </div>

                <div className="flex gap-5 my-5 text-[#aaaaaa] px-5">
                  <span>{video.owner.fullName}</span>
                  <span>| &nbsp;&nbsp;{video.viewsCount} Views</span>
                </div>

                <div className="text-[#aaaaaa] text-[1.1rem] px-5">
                  <h2>{video.description}</h2>
                </div>
              </section>
            </div>
          ))}
      </section>
    </div>
  );
}

export default WatchHistory;
