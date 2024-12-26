import React from "react";
import { RxCross2 } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router";

function videoPostNav() {
  const navigation = useNavigate();

  const handleCross = () => {
    navigation("/profile");
  };

  return (
    <header className="p-4 border-zinc-800 bg-[#282828] z-10 flex justify-between items-center border w-full sticky top-0  ">
      <section>
        <h1 className="text-2xl">Title</h1>
      </section>
      <section>
        <div
          onClick={handleCross}
          className="h-10 w-10 rounded-full active:bg-[#6f6f6f] hover:bg-[#5e5e5e] cursor-pointer duration-200 bg-[#4a4a4a] justify-center items-center flex"
        >
          <ImCross className="" />
        </div>
      </section>
    </header>
  );
}

export default videoPostNav;
