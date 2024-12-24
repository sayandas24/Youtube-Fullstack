import React from "react";

import { RiDeleteBack2Line } from "react-icons/ri";
import { useNavigate } from "react-router";

function VideoPostRight({ file, videoUrl, fileSizeReadable, removeVideo }) {
  const navigate = useNavigate();

  const backToUpload = () => {
    if (removeVideo) {
      navigate("/upload");
    }
  };

  return (
    <section className="sticky top-[7rem] w-[35%] h-[20rem]   rounded-xl">
      <div className=" absolute top-0 left-0 w-full border-red-300 h-[17rem] rounded-xl flex flex-col overflow-hidden">
        {/* video box */}
        <section className="h-[10rem] w-full rounded-t-xl">
          <video
            className="w-full h-full object-cover"
            src={videoUrl? videoUrl : ""}
            controls
          ></video>
        </section>

        {/* Video about */}
        <section className="flex flex-col gap-4 p-3 bg-[#1f1f1f] ">
          {/* UP */}
          <div className="flex justify-between items-center">
            <section className="flex leading-[15px]  flex-col w-[80%] overflow-hidden">
              <h1 className="text-sm text-zinc-600">video name</h1>
              <h1 className="text-blue-400 truncate">{file?.name || file.title}</h1>
            </section>
            <div
              className={`rounded-full p-1 ${removeVideo? "cursor-pointer" : "cursor-not-allowed"}`}
              onClick={backToUpload}
            >
              <RiDeleteBack2Line className={`text-xl ${removeVideo? "text-zinc-300 hover:text-zinc-50": "text-gray-500 hover:text-gray-500"}`} />
            </div>
          </div>

          {/* Down */}
          <div className="flex leading-[18px] flex-col ">
            <h1 className="text-sm text-zinc-600">File size</h1>
            <h1 className="text-zinc-400">{fileSizeReadable? fileSizeReadable : "null"}</h1>
          </div>
        </section>
      </div>
    </section>
  );
}

export default VideoPostRight;
