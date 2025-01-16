import React from "react";
import { useLocation } from "react-router";
import VideoPostHeader from "./VideoPostHeader";
import VideoPostFooter from "./VideoPostFooter";
import VideoPostRight from "./VideoPostPlayer";
import VideoPostAbout from "./VideoPostAbout";

function VideoPost() {
  const location = useLocation();
  const file = location.state?.file;
  const videoUrl = location.state?.videoUrl; 
  let fileSizeReadable = null;


 if (file) {
  const formatFileSize = (sizeInBytes) => {
    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    let index = 0;
  
    while (sizeInBytes >= 1024 && index < units.length - 1) {
      sizeInBytes /= 1024;
      index++;
    }
  
    return `${sizeInBytes.toFixed(2)} ${units[index]}`;
  };
  fileSizeReadable = formatFileSize(file.size); 
 }

    

  return (
    <div className="border bg-[#282828] border-zinc-800 text-white h-[48rem] w-[95vw] max-w-[55rem] mx-auto mt-5 rounded-xl relative overflow-x-auto max-[500px]:mb-[4rem] max-[500px]:h-[100vh]">
       <VideoPostHeader file={file}/>

      <main className="flex  px-[2rem] gap-5 max-[720px]:flex-col-reverse max-[720px]:items-center max-[720px]:gap-3 max-[720px]:px-[1rem] max-[500px]:px-1">
        {/* left about section*/}
        <VideoPostAbout file={file}/>

        {/* right */}
        <VideoPostRight file={file} videoUrl={videoUrl} fileSizeReadable={fileSizeReadable} removeVideo={true}/>
      </main>


    {/* <VideoPostFooter/> */}
     
    </div>
  );
}

export default VideoPost;
