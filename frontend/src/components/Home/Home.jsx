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
import { HomeVideo } from "../UI/HomeVideo";

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
          <HomeVideo videos={videos} />
        )}
      </div>
    </div>
  );
}

export default Home;
