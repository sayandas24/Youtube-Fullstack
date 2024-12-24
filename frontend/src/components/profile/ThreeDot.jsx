import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { ProfileContext } from "../../contexts/profileContext/profileContext";

function ThreeDot({ video }) {
  const {deleteClick, setDeleteClick} = useContext(ProfileContext)

  return (
    <div>
      <section className="more-options-content absolute bottom-0 left-8 bg-[#1f1f1f] text-[.75rem] overflow-hidden rounded-2xl py-2">
        <NavLink
          to={`/video-update/${video?._id}`}
          className="flex items-center gap-2 hover:bg-[#363636] p-2 px-4"
        >
          <MdOutlineEdit className="text-xl" />
          <div className="text-[.8rem]">Edit title, description...</div>
        </NavLink>
        <div
          onClick={() => setDeleteClick(!deleteClick)}
          className="flex items-center gap-2 hover:bg-[#363636] p-2 px-4"
        >
          <MdDelete className="text-xl" />
          <h1 className="text-[.8rem]">Delete Forever</h1>
        </div>
      </section>
 
    </div>
  );
}

export default ThreeDot;
