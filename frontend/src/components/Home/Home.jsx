import React from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/videos")
      .then((res) => {
        setVideos(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="videoContainer" className="p-10 flex gap-5 flex-wrap">
      {videos.map((file) => (
        <main key={file._id} className="flex flex-col gap-1 w-[30rem]">
          <section className="videoParent border border-black bg-zinc-600 rounded-3xl overflow-hidden w-[30rem] h-[20rem] ">
            <img
              className="w-full h-full object-cover"
              src={file.thumbnail}
              alt="video"
            />
          </section>

          <section className="flex gap-2">
            {/* Avatar */}
            <div className="w-[2.3rem] h-[2.3rem] overflow-hidden rounded-full">
              <img
                className="w-full h-full object-cover"
                src={file.owner.avatar}
                alt="avatar"
              />
            </div>
            {/* Avatar name, description */}
            <div className="flex flex-col gap-1 text-white w-[95%]">
              <h1 className="text-[.9rem] leading-4">
                Description is the main content of the video thats how this
                works in case of any situation
              </h1>
              <p className="text-[.8rem] text-zinc-400">
                {file.owner.fullName}
              </p>
            </div>
          </section>
        </main>
      ))}
    </div>
  );
}

export default Home;
