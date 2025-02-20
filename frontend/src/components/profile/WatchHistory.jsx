import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Layout/Sidebar";
import { RxCross1 } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import axiosInstance from "../../utils/axiosInstance";
import { NavLink, useNavigate } from "react-router";
import { FeatureSoonContext } from "../../contexts/featureSoonContext/UseFeatureSoon";

function WatchHistory() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({}); 
  const navigate = useNavigate();
  const { handleFeatureSoonShow } = useContext(FeatureSoonContext);
 
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
 
  
  useEffect(() => { 

    if (window.location.pathname === "/user/history") {
      axiosInstance
        .get("/user/current-user")
        .then((res) => {
          setUser(res.data.data); 
        })
        .catch((err) => {
          handleFeatureSoonShow("Login to show watch history");
          console.log(err); 
          navigate("/login");
        });
    }
  }, []);
  


  // delete watch history video 
  const handleDelete = (id) => {
    axiosInstance
      .delete(`/user/history/${id}`)
      .then((res) => {
        setData((prev) => prev.filter((video) => video._id !== id)); 
      })
      .catch((err) => {
        console.log("WatchHistory not found", err);
      });
  };

  return (
    <div className="flex dark:bg-[#e8e9ec]">
      <section className="max-[500px]:hidden">
        <Sidebar />
      </section>

      <section className="min-[500px]:w-[60rem] mx-auto flex justify-center text-white flex-col gap-1 max-[500px]:mb-[3rem] max-[500px]:mt-5">
        {
          data.length == 0 && (
            <div className="flex items-center justify-center">
              <h1 className="text-xl mt-5">No video in watch history</h1>
            </div>
          )
        }
        {data &&
          data.map((video) => (
            <div
              key={data._id}
              className=" rounded-xl min-[500px]:h-[11rem] flex p-2"
            >
              <NavLink
                to={`/p/${video._id}`}
                className="h-full w-[18rem]  overflow-hidden rounded-xl max-[600px]:w-[12rem] max-[500px]:h-[7.5rem] max-[750px]:w-[14rem] max-[750px]:h-[8.5rem]

               flex-shrink-0 max-[450px]:!h-[6.5rem] max-[450px]:!w-[10rem] max-[350px]:!h-[5.5rem] max-[350px]:!w-[8.5rem]"
              >
                <img
                  className="w-full h-full object-cover"
                  src={video.thumbnail}
                  alt=""
                />
              </NavLink>

              <section className="w-full  flex-1">
                <div className=" flex justify-between flex-row w-full p-2 pl-5 max-[450px]:pl-2 max-[450px]:pr-0">
                  <h1 className="text-xl line-clamp-2 max-[600px]:text-[1rem] dark:!text-zinc-800">
                    {video.title}
                  </h1>
                  <div className="ml-auto flex  gap-5 max-[600px]:gap-1">
                    <RxCross1 onClick={() => handleDelete(video._id)} className="dark:!text-zinc-800 cursor-pointer max-[600px]:p-2 max-[600px]:text-[2rem] text-[3rem] p-3 rounded-full hover:bg-[#2c2c2c] dark:hover:bg-[#c2c6c8]" />
                    <BsThreeDotsVertical className="dark:!text-zinc-800 cursor-pointer max-[600px]:p-2 max-[600px]:text-[2rem] text-[3rem] p-3 rounded-full active:bg-[#2c2c2c] dark:active:bg-[#c2c6c8]" />
                  </div>
                </div>

                <div className="flex dark:!text-zinc-600 gap-1 my-1 text-[#aaaaaa] px-5 font-[450] max-[600px]:text-[.8rem] max-[450px]:pl-2">
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
