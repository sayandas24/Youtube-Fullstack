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
    <div className="border bg-[#282828] border-zinc-800 text-white h-[48rem] w-[55rem] mx-auto mt-5 rounded-xl relative overflow-x-auto">
       <VideoPostHeader file={file}/>

      <main className="flex  px-[2rem] gap-5">
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
