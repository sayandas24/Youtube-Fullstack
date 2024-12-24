import React, { useContext } from "react";
import { NavLink } from "react-router";
import { ProfileContext } from "../../contexts/profileContext/profileContext";

function DeleteMenu() {
    const { setDeleteClick} = useContext(ProfileContext)

  return (
    <div className="w-full h-screen bg-[rgba(0,0,0,0.76)] fixed top-0 left-0">
      <div className="max-h-[20rem] w-[35rem] rounded-2xl bg-[#282828] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 flex flex-col gap-3 px-7">
        <h1 className="text-2xl">Permanently delete this video?</h1>

        <section className="flex border border-zinc-700 p-3 gap-4 rounded-xl bg-[#171717]">
          <div className="h-[5rem] w-[8rem]  border rounded-xl overflow-hidden">
            <img src="" alt="" />
          </div>
          <div className="flex flex-col text-sm mt-3 leading-[1rem]">
            <h1>Title</h1>
            <h2 className="text-zinc-400 text-[.7rem]">Uploaded date</h2>
            <h2 className="text-zinc-400 text-[.7rem]">Views</h2>
          </div>
        </section>

        <section className="flex gap-2 mt-4">
          <input type="checkbox" name="understand" id="understand" />
          <label htmlFor="understand">I understand, delete forever</label>
        </section>

        <section className="mt-[1rem] flex justify-between items-center">
          <div onClick={() => setDeleteClick(false)} className="hover:bg-[#535353] bg-[#3b3b3b] rounded-full p-[.5rem] px-5 text-sm">
            Cancel
          </div>
          <NavLink className="hover:bg-[#535353] bg-[#3b3b3b] rounded-full p-[.5rem] px-5 text-sm">
            Delete Forever
          </NavLink>
        </section>
      </div>
    </div>
  );
}

export default DeleteMenu;
