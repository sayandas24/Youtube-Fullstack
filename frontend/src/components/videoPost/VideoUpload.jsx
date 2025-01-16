import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import Sidebar from "../Layout/Sidebar";

function VideoUpload() {
  const [uploadVideo, setUploadVideo] = useState(null);
  const navigate = useNavigate();

  const handleUpload = (e) => { 
    const file = e.target.files[0];
    if (file) {
        const videoUrl = URL.createObjectURL(file);
        navigate("/video-upload", { state: { videoUrl, file } }); 
    }
  };

  return (
    <div className="relative h-[80vh]">
        <div className="max-[500px]:hidden">
        <Sidebar />
        </div>
      <label
        htmlFor="upload"
        className="cursor-pointer border w-[10rem] h-[10rem] border-zinc-400 rounded-full border-dashed gap-1 flex flex-col items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <FaCloudUploadAlt className="text-[3rem] text-white" />
        <h1 className="text-white">Upload Video</h1>
        <input
          type="file"
          id="upload"
          className="hidden"
          accept="video/*"
          name="upload" 
          onChange={handleUpload}
        />
      </label>
    </div>
  );
}

export default VideoUpload;
