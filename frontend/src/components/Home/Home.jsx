import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { NavLink, useLocation } from "react-router";
import Sidebar from "../Layout/Sidebar";
import Sidebar2 from "../Layout/Sidebar2";
import VideoHomeSkeleton from "../UI/skeleton/VideoHomeSkeleton";
import "../../responsive/home.scss";
import NProgress from "nprogress";
import timeSince from "../../utils/timeSince";
import { CollapseContext } from "../../contexts/collapseMenu/CollapseContext";
import { useScreenWidth } from "../../utils/screenWidth";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const isHomeRoute = location.pathname === `/`;
  const { collapse2, setCollapse2 } = useContext(CollapseContext);
  const screenWidth = useScreenWidth();

  useEffect(() => {
    NProgress.start();
    axiosInstance
      .get("/video")
      .then((res) => {
        setVideos(res.data.message);
        setLoading(false);
        NProgress.done();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        NProgress.done();
      });
  }, []);

  const formSubmit = (e, videoLink) => {
    e.preventDefault();
    axiosInstance
      .get(`/video/p/${videoLink}`)
      .then((res) => {
        // pass to context
        console.log("passed video");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
     setCollapse2(true);
  }, []);
  

  return (
    <div className="flex ">
      <section className="hide-item-in-small">
        <Sidebar />
      </section>
      {screenWidth < 1024 && (
        <div
          className={`${
            isHomeRoute && collapse2 ? "-translate-x-[18rem]  " : ""
          } transition-all duration-150 top-[0] left-0 z-[999] fixed sidebar hide-item-in-small`}
        >
          <Sidebar2 />
        </div>
      )}

      <div
        id="videoContainer"
        className={`${
          loading ? "overflow-y-hidden" : ""
        } px-5 w-full gap-5 flex-wrap overflow-y-auto max-[500px]:mb-[3rem]`}
      >
        {loading ? (
          <VideoHomeSkeleton number={12} />
        ) : (
          videos.map((file) => (
            <section key={file._id} className="h-fit ">
              <form onSubmit={(e) => formSubmit(e, file._id)}>
                <main
                  onClick={(e) => {
                    e.currentTarget.closest("form").requestSubmit();
                  }}
                  id="eachVideo"
                  className="flex overflow-hidden cursor-pointer flex-col gap-1 mb-5"
                >
                  <NavLink
                    to={`/p/${file._id}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                    className="videoParent relative border h-[18rem]   border-black bg-zinc-600 rounded-3xl overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-transparent duration-200 hover:bg-[#f0f0f010]"></div>
                    <img
                      className="w-full h-full object-cover"
                      src={file.thumbnail}
                      alt="video"
                    />
                  </NavLink>

                  <NavLink
                    to={`/channel/${file.owner.username}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                    className="flex gap-2"
                  >
                    {/* Avatar */}
                    <div className="w-[2.8rem] h-[2.8rem] max-sm:ml-2">
                      <div className="w-[2.8rem] h-[2.8rem] overflow-hidden rounded-full">
                        <img
                          className="w-full h-full object-cover"
                          src={file.owner.avatar}
                          alt="avatar"
                        />
                      </div>
                    </div>
                    {/* Avatar name, description */}
                    <div className="flex flex-col text-white w-[95%]">
                      <h1 className="text-[1rem] leading-5">{file.title}</h1>
                      <p className="text-[.8rem] text-zinc-400">
                        {file.owner.fullName}
                      </p>
                      <p className="text-[.8rem] text-zinc-400">
                        {file.viewsCount} views | posted{" "}
                        {timeSince(file.createdAt)}
                      </p>
                    </div>
                  </NavLink>
                </main>
              </form>
            </section>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
