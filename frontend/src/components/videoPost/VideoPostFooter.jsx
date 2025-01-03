import React, { useState } from "react";
import { ClipLoader } from "react-spinners"; // Example of a spinner component

// import "../../script.js";

function VideoPostFooter({ loading }) {
  const [showHover, setShowHover] = useState(false);


  const onLoadingHover = () => { 
    setShowHover(true);
  }
  const offLoadingHover = () => { 
    setShowHover(false);
  }
  return (
    <footer className=" border-zinc-700 w-full sticky bottom-0 left-0 flex justify-between items-center p-4">
      <section>details more@</section>
      <section>
        <button
          type="submit"
          className="bg-white text-black h-[2rem] w-[5rem] rounded-full flex items-center justify-center"
        >
          {loading ? (
            <div onMouseEnter={onLoadingHover} onMouseLeave={offLoadingHover} className="flex items-center w-full h-full justify-center">
              <ClipLoader color="#000" loading={true} size={17}/>
            </div>
          ) : (
            <h1 className="font-bold text-[.9rem]">Upload</h1>
          )}
          {
            showHover? (
              <div className="absolute -top-[2rem] right-0 p-3 opacity-100 rounded-full duration-300 text-blue-200 text-[.7rem] z-10">it will take a while depending on the size</div>
            ) : (
              <div className="absolute -top-[2rem] right-0 p-3 rounded-full opacity-0 duration-300  text-blue-200 text-[.7rem] z-10">it will take a while depending on the size</div>
            )
          }
        </button>
      </section>
    </footer>
  );
}

export default VideoPostFooter;
