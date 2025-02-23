import React from "react";
import { RxCross2 } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router";
import "../../responsive/navbar.scss"

function videoPostNav({ file }) {
  const navigation = useNavigate();

  console.log("file", file)
  const handleCross = () => {
    navigation("/profile");
  };

  return (
    <header className="navBlur p-4 max-[720px]:py-1 border-zinc-800 bg-[#28282854]s  z-10 flex justify-between items-center border w-full sticky top-0 ">
      <section className="line-clamp-1 ">
        <h1 className=" text-2xl max-[720px]:text-lg ">{file?.name? file.name : "Video Title"}</h1>
      </section>
      <section>
        <div
          onClick={handleCross}
          className="h-10 w-10 max-[720px]:h-8 max-[720px]:w-8 rounded-full active:bg-[#6f6f6f] hover:bg-[#5e5e5e] cursor-pointer duration-200 bg-[#4a4a4a] justify-center items-center flex"
        >
          <ImCross className="" />
        </div>
      </section>
    </header>
  );
}

export default videoPostNav;
