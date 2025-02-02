import React, { useState } from "react";
import { ClipLoader } from "react-spinners"; // Example of a spinner component

// import "../../script.js";

function VideoPostFooter({ loading }) {
  const [showHover, setShowHover] = useState(false);
  const [showMention, setShowMention] = useState(false);
  const [showHashtag, setShowHashtag] = useState(false);

  const onLoadingHover = () => {
    setShowHover(true);
  };
  const offLoadingHover = () => {
    setShowHover(false);
  };
  return (
    <footer className=" border-zinc-700 w-full sticky bottom-0 left-0 flex justify-between items-center p-4 max-[500px]:p-0 max-[500px]:py-4">
      <section className="flex gap-2 font-bold text-[.9rem] ">
        <div
          onClick={() => {
            setShowMention(!showMention);
            setShowHashtag(false);
          }}
          className="rounded-full bg-blue-600 h-[2rem] px-2 flex items-center justify-center"
        >
          @ Mention
          {showMention && (
            <div className="absolute -top-[1.5rem] left-0 p-3 opacity-100 rounded-full duration-300 text-blue-200 text-[.7rem] z-10">
              This feature is coming soon
            </div>
          )}
        </div>
        <div
          onClick={() => {
            setShowHashtag(!showHashtag);
            setShowMention(false);
          }}
          className="rounded-full bg-red-600 h-[2rem] px-2 flex items-center justify-center"
        >
          # Hashtag
          {showHashtag && (
            <div className="absolute -top-[1.5rem] left-10 p-3 opacity-100 rounded-full duration-300 text-blue-200 text-[.7rem] z-10">
              This feature is coming soon
            </div>
          )}
        </div>
      </section>
      <section>
        <button
          type="submit"
          className="bg-white text-black h-[2rem] w-[5rem] rounded-full flex items-center justify-center"
        >
          {loading ? (
            <div
              onMouseEnter={onLoadingHover}
              onMouseLeave={offLoadingHover}
              className="flex items-center w-full h-full justify-center"
            >
              <ClipLoader color="#000" loading={true} size={17} />
            </div>
          ) : (
            <h1 className="font-bold text-[.9rem]">Upload</h1>
          )}
          {showHover ? (
            <div className="absolute -top-[2rem] right-0 p-3 opacity-100 rounded-full duration-300 text-blue-200 text-[.7rem] z-10">
              it will take a while depending on the size
            </div>
          ) : (
            <div className="absolute -top-[2rem] right-0 p-3 rounded-full opacity-0 duration-300  text-blue-200 text-[.7rem] z-10">
              it will take a while depending on the size
            </div>
          )}
        </button>
      </section>
    </footer>
  );
}

export default VideoPostFooter;
