import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { ProfileContext } from "../../contexts/profileContext/profileContext";
import axiosInstance from "../../utils/axiosInstance";
import { ClipLoader } from "react-spinners"; // Example of a spinner component
import Checkbox from "@mui/material/Checkbox";

function DeleteMenu() {
  const { setDeleteClick, videoDetails } = useContext(ProfileContext);
  const [loading, setLoading] = useState(false);
  const [checkInput, setCheckInput] = useState(false);

  const navigate = useNavigate(); 

  const handleDelete = () => {
    setLoading(true);
    axiosInstance
      .delete(`/video/delete/${videoDetails?._id}`)
      .then((res) => {
        setDeleteClick(false);
        navigate("/profile");
        window.location.reload();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full h-screen bg-[rgba(0,0,0,0.76)] fixed top-0 left-0">
      <div className="max-h-[20rem] w-[35rem] max-[600px]:w-[90%] rounded-2xl bg-[#282828] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 flex flex-col gap-3 px-7 max-[600px]:px-2">
        <h1 className="text-2xl max-[600px]:text-lg">Permanently delete this video?</h1>

        <section className="flex border border-zinc-700 p-3 gap-4 rounded-xl bg-[#171717] max-[600px]:p-2 max-[600px]:gap-2">
          <div className="h-[5rem] w-[8rem]  rounded-xl overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={videoDetails?.thumbnail}
              alt=""
            />
          </div>
          <div className="flex flex-col text-sm mt-3 leading-[1rem]">
            <h1>{videoDetails?.title}</h1>
            <h2 className="text-zinc-400 text-[.7rem]">
              {videoDetails?.createdAt
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-")}
            </h2>
            <h2 className="text-zinc-400 text-[.7rem]">
              {videoDetails?.views} Views
            </h2>
          </div>
        </section>

        <section className="flex gap-1 mt-1 items-center">

          <Checkbox 
            className="!text-white "
            aria-label="Checkbox demo"
            onChange={(e) => setCheckInput(e.target.checked)}
            name="understand"
            id="understand"
          /> 
          <label htmlFor="understand" className="cursor-pointer">
            I understand, delete forever
          </label>
        </section>

        <section className="mt-[1rem] flex justify-between items-center">
          <div
            onClick={() => setDeleteClick(false)}
            className="hover:bg-[#535353] bg-[#3b3b3b] rounded-full p-[.5rem] px-5 text-sm"
          >
            Cancel
          </div>
          <NavLink
            onClick={handleDelete}
            className={`${
              checkInput ? "cursor-pointer" : "pointer-events-none opacity-50"
            } hover:bg-[#535353] bg-[#3b3b3b] rounded-full p-[.5rem] px-5 font-bold text-[.9rem] flex items-center gap-2`}
          >
            {loading ? (
              <div className="flex items-center w-full h-full justify-center gap-2 cursor-progress">
                Deleting <ClipLoader color="#fff" loading={true} size={17} />
              </div>
            ) : (
              <h1 className="font-bold text-[.9rem]">Delete Forever</h1>
            )}
          </NavLink>
        </section>
      </div>
    </div>
  );
}

export default DeleteMenu;
