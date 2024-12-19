import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { NavLink } from "react-router";

function RelatedVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("video/")
      .then((res) => {
        setVideos(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); 

  return (
    <section className=" w-full rounded-2xl flex text-white flex-col gap-3">
      {videos.map((video) => (
        <div key={video._id} className="flex  gap-2 w-full">
          {/* thumbnail */}
          <NavLink to={`/p/${video._id}`}>
            <div className="w-[13rem] h-[8rem] border-zinc-600 rounded-2xl overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={video.thumbnail}
                alt=""
              />
            </div>
          </NavLink>

          {/* thumbnail details */}
          <div className="flex flex-col py-2 gap-1 w-[25rem]">
            <h1 className="text-[1.2rem] font-semibold text-wrap">
              {video.title}
            </h1>

            <div className="flex flex-col text-zinc-400 text-[1rem]">
              <h2 className="text-zinc-300">{video.owner.fullName}</h2>
              <div className="flex gap-2 items-center">
                <span>45M views</span>
                <span>2 years ago</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default RelatedVideos;
