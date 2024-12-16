import React from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react"; 
import { NavLink } from "react-router";

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/video")
      .then((res) => {
        setVideos(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formSubmit = (e, videoLink) => {
    e.preventDefault();
    axiosInstance
      .get(`/video/p/${videoLink}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div id="videoContainer" className="p-10 flex gap-5 flex-wrap">
      {videos.map((file) => (
        <NavLink key={file._id} to={`/p/${file._id}`}>
          <form onSubmit={(e) => formSubmit(e, file._id)}>
            <main
              onClick={(e) => {
                e.currentTarget.closest("form").requestSubmit();
              }}
              className="flex cursor-pointer flex-col gap-1 w-[30rem]"
            >
              <section className="videoParent border  border-black bg-zinc-600 rounded-3xl overflow-hidden w-[30rem] h-[20rem] ">
                <img
                  className="w-full h-full object-cover"
                  src={file.thumbnail}
                  alt="video"
                />
              </section>

              <section className="flex gap-2">
                {/* Avatar */}
                <div className="w-[2.8rem] h-[2.8rem]">
                  <div className="w-[2.8rem] h-[2.8rem] overflow-hidden rounded-full">
                    <img
                      className="w-full h-full object-cover"
                      src={file.owner.avatar}
                      alt="avatar"
                    />
                  </div>
                </div>
                {/* Avatar name, description */}
                <div className="flex flex-col gap-1 text-white w-[95%]">
                  <h1 className="text-[1.1rem] leading-5">
                    Description is the main content of the video thats how this
                    works in case of any situation
                  </h1>
                  <p className="text-[1rem] text-zinc-400">
                    {file.owner.fullName}
                  </p>
                </div>
              </section>
            </main>
          </form>
        </NavLink>
      ))}
    </div>
  );
}

export default Home;
