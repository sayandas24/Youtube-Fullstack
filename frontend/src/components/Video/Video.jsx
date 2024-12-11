import React from "react";
import Comments from "./Comments";
import RelatedVideos from "./RelatedVideos";
import { RiShareForwardLine } from "react-icons/ri";
import { LiaDownloadSolid } from "react-icons/lia";

function Video() {
  return (
    <div className="p-5 py-14">
      <main className="flex gap-5">
        {/* left video */}
        <section className="w-[75rem] text-white flex flex-col gap-3">
          {/* video player, channel details */}
          <div className="flex flex-col gap-3">
            {/* video player */}
            <section className="border border-zinc-600 rounded-2xl h-[40rem] w-[75rem]"></section>
            {/* video title */}
            <section className="text-[1.2rem] leading-[1.4rem]">
              Description is the main content of the video thats how this works
              in case of any situation you can use this description
            </section>
            {/* channel details, subs */}
            <section className="flex gap-2 items-center">
              {/* Avatar */}
              <div className="w-[2.4rem]">
                <div className="w-[2.4rem] border h-[2.4rem] overflow-hidden rounded-full">
                  <img
                    className="w-full h-full object-cover"
                    src=""
                    alt="avatar"
                  />
                </div>
              </div>
              {/* Avatar name, description */}
              <div className="flex flex-col text-white text-nowrap">
                <p className="text-[1.2rem]">Sayan Das</p>
                <p className="text-[.8rem] text-zinc-500">23M Subscribers</p>
              </div>
              {/* Subscribe and other buttons */}
              <div className="flex justify-between w-full">
                <button className="p-[.4rem] px-5 border border-zinc-600 bg-zinc-700 rounded-full text-sm font-semibold">
                  Subscribe
                </button>

                <div className="flex gap-2">
                  <button className="p-[.4rem] px-5 border border-zinc-600 bg-zinc-700 rounded-full text-sm font-semibold">
                    Like
                  </button>
                  <button className="p-[.4rem] px-5 border border-zinc-600 bg-zinc-700 rounded-full text-sm font-semibold">
                    <RiShareForwardLine />
                    Share
                  </button>
                  <button className="p-[.4rem] px-5 border border-zinc-600 bg-zinc-700 rounded-full text-sm font-semibold">
                    More
                    <LiaDownloadSolid />
                  </button>
                  <button className="p-[.4rem] px-5 border border-zinc-600 bg-zinc-700 rounded-full text-sm font-semibold">
                    More
                    
                  </button>
                </div>
              </div>
            </section>
          </div>
          {/* video description */}
          <div className="flex gap-2 w-full border border-zinc-600 p-2 py-5 rounded-2xl flex-col">
            {/* video description */}
            <div>
              <h1>video time when post and tags</h1>
              <p>video description</p>
            </div>

            {/* channel details, subs */}
            <section className="flex gap-2 items-center mt-[10rem]">
              {/* Avatar */}
              <div className="w-[2.4rem]">
                <div className="w-[2.4rem] border h-[2.4rem] overflow-hidden rounded-full">
                  <img
                    className="w-full h-full object-cover"
                    src=""
                    alt="avatar"
                  />
                </div>
              </div>
              {/* Avatar name, description */}
              <div className="flex flex-col text-white text-nowrap">
                <p className="text-[1.2rem]">Sayan Das</p>
                <p className="text-[.8rem] text-zinc-500">23M Subscribers</p>
              </div>
            </section>

            {/* social media handles */}
            <section className="flex gap-2">
              <button className="p-[.4rem] px-5 border border-zinc-600 rounded-full text-sm font-semibold">
                Facebook
              </button>
              <button className="p-[.4rem] px-5 border border-zinc-600 rounded-full text-sm font-semibold">
                Facebook
              </button>
              <button className="p-[.4rem] px-5 border border-zinc-600 rounded-full text-sm font-semibold">
                Facebook
              </button>
            </section>
          </div>

          {/* comments */}
          <Comments />
        </section>

        {/* right other videos */}
        <RelatedVideos />
      </main>
    </div>
  );
}

export default Video;
