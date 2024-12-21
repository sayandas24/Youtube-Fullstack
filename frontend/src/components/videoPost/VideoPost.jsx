import React from "react";
import { LuImageDown } from "react-icons/lu";
import { RiGeminiFill } from "react-icons/ri";


function VideoPost() {
  return (
    <div className="border bg-[#282828] border-zinc-800 text-white h-[48rem] w-[55rem] mx-auto mt-5 rounded-xl relative overflow-x-auto">
      <header className="p-4 border-zinc-800 bg-[#282828] z-10 flex justify-between items-center border w-full sticky top-0  ">
        <section>
          <h1 className="text-2xl">Title</h1>
        </section>
        <section>
          <div className="h-10 w-10 rounded-full border justify-center items-center flex">
            X
          </div>
        </section>
      </header>

      <main className="flex  px-[2rem] gap-5">
        {/* left about section*/}
        <section className="w-[65%] h-full border-zinc-700 rounded-xl flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Details</h1>
          {/* title */}
          <div className="input-box ">
            <input
              required=" "
              type="text"
              className="input border border-zinc-500"
            />
            <label className="label text--flicking">
              Title<sup>*</sup>
            </label>
          </div>
          {/* description */}
          <div className="input-box">
            <textarea
              required=" "
              rows="8"
              className="input w-full resize-none bg-transparent rounded-lg border border-zinc-500"
            ></textarea>
            <label className="label text--flicking">
              Description<sup>*</sup>
            </label>
          </div>

          {/* Thumbnail */}
          <div className="flex flex-col leading-5">
            <h1 className="text-[15px] ">Thumbnail</h1>
            <p className="text-[12px] text-zinc-400">
              Set a thumbnail that stands out and draws viewers attention
            </p>
          </div>

          <div className="flex gap-5">
            <section>
              <label
                htmlFor="thumbnail"
                className="cursor-pointer  border w-[10rem] h-[5rem] border-zinc-400 rounded-lg border-dashed gap-1 flex-col items-center justify-center flex"
              >
                <LuImageDown className="text-xl text-zinc-300" />
                <h1 className="text-[11px] text-zinc-300">Upload Thumbnail</h1>
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </section>

            <section>
              <label
                htmlFor="thumbnail"
                className="cursor-pointer  border w-[10rem]  h-[5rem] border-zinc-400 rounded-lg border-dashed gap-1 flex-col items-center justify-center flex"
              >
                <RiGeminiFill className="text-xl text-zinc-300" />
                <div className="leading-[12px]">
                  <h1 className="text-[11px] text-zinc-300 ">
                    Generate with Ai
                  </h1>
                  <h2 className="text-[9px] text-zinc-300 ">
                    (under development)
                  </h2>
                </div>
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </section>
          </div>


          {/* Tags */}
          <div className="flex flex-col mt-3">
            <h1 className="text-[15px] ">Tags</h1>
            <p className="text-[12px] text-zinc-400">
              Add tags to help viewers discover your video
            </p>
          </div>
        </section>

        {/* right */}
        <section className="sticky top-[7rem] w-[35%] h-[20rem] border-zinc-700 rounded-xl">
          <div className=" absolute top-0 left-0 w-full border-red-300 h-[17rem] rounded-xl flex flex-col overflow-hidden">
            {/* video box */}
            <section className="h-[10rem] border  border-blue-500 w-full rounded-t-xl"></section>

            {/* Video about */}
            <section className="flex flex-col gap-4 p-3 bg-[#1f1f1f] ">
              {/* UP */}
              <div className="flex justify-between items-center">
                <section className="flex leading-[15px]  flex-col">
                  <h1 className="text-sm text-zinc-600">video link</h1>
                  <h1 className="text-blue-400">video link 123456 sss</h1>
                </section>
                <p className="border rounded-full p-1">CP</p>
              </div>

              {/* Down */}
              <div className="flex leading-[15px] flex-col ">
                <h1 className="text-sm text-zinc-600">File name</h1>
                <h1>sample video 123</h1>
              </div>
            </section>
          </div>
        </section>
      </main>

      <footer className="border border-zinc-700 w-full sticky bottom-0 left-0 flex justify-between items-center p-4">
        <section>details more@</section>
        <section>
          <div className="bg-white text-black p-3 py-1 rounded-full w-fit">
            Next
          </div>
        </section>
      </footer>
    </div>
  );
}

export default VideoPost;
