import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import VideoPostHeader from "./VideoPostHeader";
import VideoPostFooter from "./VideoPostFooter";
import VideoPostRight from "./VideoPostPlayer";
import VideoPostAbout from "./VideoPostAbout";
import axiosInstance from "../../utils/axiosInstance";

function UpdateVideo() {
  const location = useLocation();
  const file = location.state?.file;
  const videoUrl = location.state?.videoUrl;
  let fileSizeReadable = null;  

  const [video, setVideo] = useState({});
  const [remove, setRemove] = useState(false);

  // axiosInstance.patch("/video/update/:id", {})
  
  const videoId = useParams();

  useEffect(() => {
    axiosInstance
    .get(`/video/p/${videoId.id}`)
    .then((res) => {
      setVideo(res.data.message);
       
    })
    .catch((err) => console.log(err)); 
  },  [videoId.id]);  
  

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
      <VideoPostHeader />

      <main className="flex  px-[2rem] gap-5">
        {/* left about section*/}
        <VideoPostAbout file={file} existingVideo={video}/>

        {/* right */}
        <VideoPostRight
          file={file || video}
          videoUrl={videoUrl || video.videoFile}
          fileSizeReadable={fileSizeReadable}
          removeVideo={remove}
        />
      </main>

      {/* <VideoPostFooter/> */}
    </div>
  );
}

export default UpdateVideo;
