"use client";

import { RetroGrid } from "@/components/magicui/retro-grid";
import { NavLink } from "react-router";

export function RetroGridDemo() {
  return (
    <div className="w-1/2 fixed left-0 top-0 z-[99] h-screen flex  flex-col items-center justify-center overflow-hidden  bg-background md:shadow-xl">
      <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
        Metube is Running
      </span>
      <NavLink to="/">
        <button className="absolute top-5 left-5 bg-zinc-800 text-white font-bold py-2 px-10 rounded-2xl mt-5 ml-5 hover:bg-zinc-900 transition duration-300">
          Home
        </button>
      </NavLink>

      <RetroGrid />
    </div>
  );
}
